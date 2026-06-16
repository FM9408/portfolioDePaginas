// src/pages/LandingPage.jsx
import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { SiReact, SiNodedotjs, SiPostgresql, SiUnity, SiBlender, SiJira, SiPython } from 'react-icons/si';
import { GiChemicalDrop } from 'react-icons/gi';
import { TbTerminal2 } from 'react-icons/tb';

// Configuración de animaciones fluidas con física de resorte (Spring)
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 15 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const glowHoverCyan = {
  hover: {
    scale: 1.03,
    boxShadow: "0px 0px 30px rgba(0, 229, 255, 0.5)",
    borderColor: "#00e5ff",
    transition: { duration: 0.3 }
  }
};

const glowHoverPink = {
  hover: {
    scale: 1.03,
    boxShadow: "0px 0px 30px rgba(255, 0, 127, 0.5)",
    borderColor: "#ff007f",
    transition: { duration: 0.3 }
  }
};

const glowHoverPurple = {
  hover: {
    scale: 1.03,
    boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.5)",
    borderColor: "#a855f7",
    transition: { duration: 0.3 }
  }
};

export default function LandingPage() {
  return (
    <Box sx={{ bgcolor: '#06090e', color: '#ffffff', minHeight: '100vh', pb: 12, overflowX: 'hidden', position: 'relative' }}>
      
      {/* Luces de neón difusas en el fondo */}
      <Box sx={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)', zIndex: 0 }} />
      <Box sx={{ position: 'absolute', bottom: '15%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,0,128,0.1) 0%, transparent 70%)', zIndex: 0 }} />

      {/* 1. SECCIÓN HERO */}
      <Container maxWidth="lg" sx={{ pt: 15, pb: 10, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              
              <motion.div variants={fadeInUp}>
                <Typography variant="h6" sx={{ color: '#ff007f', fontWeight: 'bold', letterSpacing: 3, mb: 1 }}>
                  {'//ANALYST & DEVELOPER SYSTEM ACTIVE'}
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '3.5rem', md: '5.5rem' }, lineHeight: 1.1, mb: 2, letterSpacing: -2 }}>
                  Felipe <br />
                  <span style={{ color: '#00e5ff', textShadow: '0 0 20px rgba(0,229,255,0.4)' }}>Akvaar</span>
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Typography variant="h5" sx={{ color: '#94a3b8', mb: 4, maxWidth: '580px', fontWeight: 300, lineHeight: 1.6 }}>
                  Profesional analítico con una sólida formación en <strong>Química</strong>, complementada con experiencia en <strong>desarrollo web (Full-Stack) y garantía de calidad (QA)</strong>. Un enfoque meticuloso diseñado para la resolución de problemas complejos.
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Stack direction="row" spacing={3}>
                  <Button variant="contained" component={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    sx={{ bgcolor: '#00e5ff', color: '#06090e', fontWeight: 800, px: 4, py: 1.5, borderRadius: '0px 15px 0px 15px', '&:hover': { bgcolor: '#00b8d4' } }}>
                    INICIAR PROTOCOLO
                  </Button>
                  <Button variant="outlined" component={motion.button} whileHover={{ scale: 1.05 }}
                    sx={{ borderColor: '#ff007f', color: '#ff007f', fontWeight: 'bold', px: 4, borderRadius: '15px 0px 15px 0px', '&:hover': { borderColor: '#ff0055', bgcolor: 'rgba(255,0,127,0.05)' } }}>
                    CONTACTO: 5523098016
                  </Button>
                </Stack>
              </motion.div>

            </motion.div>
          </Grid>

          {/* Canvas HUD para foto de perfil */}
          <Grid item xs={12} md={5} display="flex" justifyContent="center">
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', duration: 1 }}>
              <Box sx={{ position: 'relative', width: '320px', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box component={motion.div} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  sx={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px dashed #00e5ff', opacity: 0.3 }} />
                <Box sx={{ width: '80%', height: '80%', borderRadius: '50%', overflow: 'hidden', border: '4px solid #06090e', boxShadow: '0 0 30px rgba(0,229,255,0.2)', bgcolor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#475569' }}>[FOTOGRAFÍA DE PERFIL]</Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* 2. MATRIZ DE COMPETENCIAS TÉCNICAS */}
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 6, textTransform: 'uppercase', textAlign: 'center', letterSpacing: -1 }}>
          Sectores de <span style={{ color: '#ff007f' }}>Inyección Técnica</span>
        </Typography>

        <Grid container spacing={4}>
          {/* Desarrollo Web */}
          <Grid item xs={12} md={4}>
            <Card component={motion.div} variants={glowHoverCyan} whileHover="hover"
              sx={{ bgcolor: '#0f1622', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '20px', p: 4, color: '#fff', cursor: 'pointer', height: '100%' }}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <SiReact size={35} color="#00e5ff" />
                <SiNodedotjs size={35} color="#22c55e" />
                <SiPostgresql size={35} color="#3b82f6" />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Core Full-Stack</Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {['JavaScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'HTML5', 'CSS3', 'Material-UI'].map(s => (
                  <Chip key={s} label={s} size="small" sx={{ bgcolor: 'rgba(0,229,255,0.1)', color: '#00e5ff', fontWeight: 'bold' }} />
                ))}
              </Box>
            </Card>
          </Grid>

          {/* QA & Motores 3D */}
          <Grid item xs={12} md={4}>
            <Card component={motion.div} variants={glowHoverPink} whileHover="hover"
              sx={{ bgcolor: '#0f1622', border: '1px solid rgba(255,0,127,0.2)', borderRadius: '20px', p: 4, color: '#fff', cursor: 'pointer', height: '100%' }}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <SiBlender size={35} color="#ea580c" />
                <SiUnity size={35} color="#ffffff" />
                <SiJira size={35} color="#0052cc" />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>QA & Entornos 3D</Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {['Jira', 'Git', 'Identificación de Bugs', 'Reporte de Bugs', 'Blender', 'Unity'].map(s => (
                  <Chip key={s} label={s} size="small" sx={{ bgcolor: 'rgba(255,0,127,0.1)', color: '#ff007f', fontWeight: 'bold' }} />
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Ciencias Químicas */}
          <Grid item xs={12} md={4}>
            <Card component={motion.div} variants={glowHoverPurple} whileHover="hover"
              sx={{ bgcolor: '#0f1622', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '20px', p: 4, color: '#fff', cursor: 'pointer', height: '100%' }}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <GiChemicalDrop size={40} color="#a855f7" />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Laboratorio Químico</Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {['Farmacología', 'Validación Farmacéutica', 'Análisis Químico', 'Química Analítica', 'Manejo de Reactivos'].map(s => (
                  <Chip key={s} label={s} size="small" sx={{ bgcolor: 'rgba(168,85,247,0.1)', color: '#c084fc', fontWeight: 'bold' }} />
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Módulo Terminal Complementario */}
        <Box sx={{ mt: 4, bgcolor: '#0b121f', p: 3, borderRadius: '16px', border: '1px solid rgba(0,229,255,0.1)' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ color: '#00e5ff', fontWeight: 'bold', mb: 0.5 }}>{'// SISTEMA DE IDIOMAS'}</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>Español (Nativo) | Inglés (Intermedio)</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ color: '#ff007f', fontWeight: 'bold', mb: 1 }}>{'//EXPANSIONES DE CÓDIGO EN PROCESO'}</Typography>
              <Stack direction="row" spacing={1.5}>
                <Chip icon={<TbTerminal2 color="#00e5ff" />} label="C#" size="small" sx={{ color: '#fff', bgcolor: '#121926', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Chip icon={<SiPython color="#ffd43b" />} label="Python" size="small" sx={{ color: '#fff', bgcolor: '#121926', border: '1px solid rgba(255,255,255,0.1)' }} />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* 3. MATRIZ INTERPERSONAL */}
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, textTransform: 'uppercase', textAlign: 'center', color: '#94a3b8' }}>
          Habilidades Blandas e Interpersonales
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1.5}>
          {['Resolución de Problemas', 'Atención al Detalle', 'Comunicación Efectiva', 'Pensamiento Analítico', 'Adaptabilidad', 'Aprendizaje Continuo', 'Trabajo en Equipo'].map(skill => (
            <Chip key={skill} label={skill} variant="outlined" sx={{ color: '#e2e8f0', borderColor: 'rgba(0,229,255,0.2)', py: 2, px: 15, '&:hover': { borderColor: '#ff007f', color: '#ff007f', bgcolor: 'rgba(255,0,127,0.02)' } }} />
          ))}
        </Box>
      </Container>

      {/* 4. HISTORIAL DE OPERACIONES */}
      <Container maxWidth="md" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 6, textTransform: 'uppercase', textAlign: 'center', letterSpacing: -1 }}>
          Historial de <span style={{ color: '#00e5ff' }}>Operaciones</span>
        </Typography>

        <Stack spacing={4}>
          {/* Operación 1: Lionbridge */}
          <Box component={motion.div} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            sx={{ background: 'linear-gradient(145deg, #0f1622 0%, #070b12 100%)', borderRadius: '24px', p: 5, borderLeft: '5px solid #ff007f', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={3}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>Tester Associate 1</Typography>
                <Typography variant="h6" sx={{ color: '#00e5ff' }}>Lionbridge Games – Ciudad de México</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#64748b', bgcolor: '#1e293b', px: 2, py: 0.5, borderRadius: '10px', mt: { xs: 1, sm: 0 }, fontWeight: 'bold' }}>
                AGO 2023 – FEB 2024
              </Typography>
            </Stack>
            <Box component="ul" sx={{ pl: 2, color: '#94a3b8', '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>Identificación y documentación precisa de errores (bugs) en videojuegos utilizando la plataforma Jira, siguiendo estándares de escritura concretos para facilitar la resolución por parte de los desarrolladores.</li>
              <li>Comunicación efectiva de hallazgos técnicos a equipos de desarrollo multidisciplinarios.</li>
              <li>Realización de análisis detallados de funcionalidades y aplicación de pensamiento crítico para asegurar la calidad del producto final.</li>
              <li>Colaboración en equipo dentro de un entorno dinámico y de ritmo rápido.</li>
            </Box>
          </Box>

          {/* Operación 2: Sanborns */}
          <Box component={motion.div} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            sx={{ background: 'linear-gradient(145deg, #0f1622 0%, #070b12 100%)', borderRadius: '24px', p: 5, borderLeft: '5px solid #64748b', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={3}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>Cajero Vendedor</Typography>
                <Typography variant="h6" sx={{ color: '#a6d4fa' }}>Sanborns Hermanos – Ciudad de México</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#64748b', bgcolor: '#1e293b', px: 2, py: 0.5, borderRadius: '10px', mt: { xs: 1, sm: 0 }, fontWeight: 'bold' }}>
                DIC 2017 – MAR 2018
              </Typography>
            </Stack>
            <Box component="ul" sx={{ pl: 2, color: '#94a3b8', '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>Gestión de transacciones de efectivo y cobro de servicios, garantizando la precisión y el manejo responsable de fondos.</li>
              <li>Atención al cliente y resolución de dudas sobre productos, contribuyendo a una experiencia de compra positiva.</li>
              <li>Organización y reabastecimiento de mercancía para mantener la exhibición óptima y la disponibilidad de inventario.</li>
              <li>Desarrollo de habilidades de comunicación y servicio al cliente.</li>
            </Box>
          </Box>
        </Stack>
      </Container>

      {/* 5. NODO DE FORMACIÓN ACADÉMICA */}
      <Container maxWidth="md" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, textTransform: 'uppercase', textAlign: 'center', letterSpacing: -1 }}>
          Carga de <span style={{ color: '#a855f7' }}>Educación</span>
        </Typography>
        <Card sx={{ bgcolor: '#0f1622', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '16px', p: 2, color: '#fff' }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#00e5ff' }}>Licenciatura en Química (En curso)</Typography>
            <Typography variant="subtitle1" sx={{ color: '#cbd5e1', mt: 0.5 }}>Universidad Autónoma Metropolitana – Ciudad de México</Typography>
            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mt: 1.5, fontWeight: 'bold', letterSpacing: 1 }}>
              OCTUBRE 2017 – EN CURSO
            </Typography>
          </CardContent>
        </Card>
      </Container>

    </Box>
  );
}