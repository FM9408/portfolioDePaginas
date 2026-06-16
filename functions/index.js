// functions/index.js
const {auth, https} = require('firebase-functions/v1');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');

admin.initializeApp();

const {getFirestore, FieldValue} = require('firebase-admin/firestore');
const db = getFirestore();


// Tratamiento inicial para inicios directos (ej. Google)
exports.crearPerfilUsuario = auth.user().onCreate(async (user) => {
  const uid = user.uid;
  const esAnonimo = !user.providerData || user.providerData.length === 0;

  if (esAnonimo) return null;

  try {
    await db
        .collection('users')
        .doc(uid)
        .set({
          uid: uid,
          email: user.email || '',
          displayName: user.displayName || 'Usuario de Google',
          photoURL: user.photoURL || '',
          role: 'user',
          createdAt: FieldValue.serverTimestamp(),
        });
    return null;
  } catch (error) {
    logger.error('Error en onCreate:', error);
    throw error;
  }
});

// NUEVA VALIDACIÓN: Verifica disponibilidad de username antes de guardar
exports.registrarDocumentoDesdeServidor = https.onCall(
    async (data, context) => {
      if (!context.auth) {
        throw new https.HttpsError(
            'unauthenticated',
            'El usuario debe estar autenticado.',
        );
      }

      const uid = context.auth.uid;
      const email = data.email;
      const username = data.username ? data.username.trim() : '';

      if (!username) {
        throw new https.HttpsError(
            'invalid-argument',
            'El nombre de usuario es obligatorio.',
        );
      }

      try {
        // 1. VALIDACIÓN EN EL SERVIDOR: Verificar si el username ya está en uso
        const snapshot = await db
            .collection('users')
            .where('displayName', '==', username)
            .get();

        if (!snapshot.empty) {
          logger.warn(
              `Intento de registro fallido: El username '${username}' ya existe.`,
          );
          // Lanzamos un error de tipo 'already-exists' que capturará el frontend
          throw new https.HttpsError(
              'already-exists',
              'El nombre de usuario ya está ocupado.',
          );
        }

        // 2. Si no está repetido, procedemos a crear el documento de forma segura
        logger.info(
            `Username disponible. Registrando documento para el UID: ${uid}`,
        );
        await db.collection('users').doc(uid).set({
          uid: uid,
          email: email,
          displayName: username, // Se guarda bajo la propiedad displayName
          photoURL: '',
          role: 'user',
          createdAt: FieldValue.serverTimestamp(),
        });

        return {success: true};
      } catch (error) {
        // Si ya es un HttpsError lo relanzamos tal cual para el cliente
        if (error instanceof https.HttpsError) throw error;

        logger.error('Error interno en el servidor:', error);
        throw new https.HttpsError(
            'internal',
            'No se pudo procesar la solicitud en el servidor.',
        );
      }
    },
);
