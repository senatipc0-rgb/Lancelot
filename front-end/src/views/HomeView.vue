<template>
  <div class="home">
    <!-- Hero -->
    <div class="hero-card">
      <div class="hero-content">
        <div class="hero-badge">Sistema Académico</div>
        <h1 class="hero-title">Bienvenido a EduGest</h1>
        <p class="hero-desc">Gestiona estudiantes, cursos, inscripciones y asistencias desde un solo lugar.</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">{{ stats.estudiantes }}</span>
            <span class="stat-label">Estudiantes</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">{{ stats.cursos }}</span>
            <span class="stat-label">Cursos</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">{{ stats.inscripciones }}</span>
            <span class="stat-label">Inscripciones</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">{{ stats.asistencias }}</span>
            <span class="stat-label">Asistencias</span>
          </div>
        </div>
      </div>
      <div class="hero-illustration">🎓</div>
    </div>

    <!-- Quick access cards -->
    <h2 class="section-title">Acceso rápido</h2>
    <div class="cards-grid">
      <router-link to="/estudiantes" class="quick-card blue">
        <div class="qc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="qc-body">
          <h3>Estudiantes</h3>
          <p>Registra y gestiona el padrón de estudiantes</p>
        </div>
        <div class="qc-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </router-link>

      <router-link to="/cursos" class="quick-card purple">
        <div class="qc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        </div>
        <div class="qc-body">
          <h3>Cursos</h3>
          <p>Administra el catálogo de cursos académicos</p>
        </div>
        <div class="qc-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </router-link>

      <router-link to="/inscripciones" class="quick-card green">
        <div class="qc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </div>
        <div class="qc-body">
          <h3>Inscripciones</h3>
          <p>Inscribe estudiantes a los cursos disponibles</p>
        </div>
        <div class="qc-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </router-link>

      <router-link to="/asistencias" class="quick-card orange">
        <div class="qc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        </div>
        <div class="qc-body">
          <h3>Asistencias</h3>
          <p>Registra y consulta el control de asistencia</p>
        </div>
        <div class="qc-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { estudianteService, cursoService, inscripcionService, asistenciaService } from '../services/api'

const stats = ref({ estudiantes: '—', cursos: '—', inscripciones: '—', asistencias: '—' })

onMounted(async () => {
  try {
    const [est, cur, ins, asi] = await Promise.all([
      estudianteService.getAll(),
      cursoService.getAll(),
      inscripcionService.getAll(),
      asistenciaService.getAll()
    ])
    stats.value = {
      estudiantes: est.length,
      cursos: cur.length,
      inscripciones: ins.length,
      asistencias: asi.length
    }
  } catch (_) {}
})
</script>

<style scoped>
.home { max-width: 1100px; }

/* Hero */
.hero-card {
  background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
  overflow: hidden;
  position: relative;
}

.hero-card::before {
  content: '';
  position: absolute;
  top: -40px;
  right: 120px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
}

.hero-card::after {
  content: '';
  position: absolute;
  bottom: -60px;
  right: 60px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: rgba(255,255,255,0.04);
}

.hero-content { position: relative; z-index: 1; }

.hero-badge {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.9);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.3rem 0.75rem;
  border-radius: 99px;
  margin-bottom: 0.875rem;
}

.hero-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.hero-desc {
  color: rgba(255,255,255,0.8);
  font-size: 0.9375rem;
  margin-bottom: 1.75rem;
  max-width: 480px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.stat { text-align: center; }

.stat-num {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}

.stat-label {
  display: block;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.7);
  margin-top: 0.2rem;
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(255,255,255,0.2);
}

.hero-illustration {
  font-size: 5rem;
  line-height: 1;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
  flex-shrink: 0;
}

/* Section title */
.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.75rem;
}

/* Cards grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.quick-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
  position: relative;
  overflow: hidden;
}

.quick-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.quick-card.blue::before { background: var(--primary); }
.quick-card.purple::before { background: var(--purple); }
.quick-card.green::before { background: var(--success); }
.quick-card.orange::before { background: var(--warning); }

.quick-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: transparent;
}

.qc-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.qc-icon svg { width: 22px; height: 22px; }

.quick-card.blue .qc-icon { background: var(--primary-muted); color: var(--primary); }
.quick-card.purple .qc-icon { background: var(--purple-light); color: var(--purple); }
.quick-card.green .qc-icon { background: var(--success-light); color: var(--success); }
.quick-card.orange .qc-icon { background: var(--warning-light); color: var(--warning); }

.qc-body { flex: 1; min-width: 0; }

.qc-body h3 {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.2rem;
}

.qc-body p {
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.qc-arrow {
  color: var(--text-light);
  flex-shrink: 0;
  transition: transform var(--transition), color var(--transition);
}

.qc-arrow svg { width: 18px; height: 18px; display: block; }

.quick-card:hover .qc-arrow {
  transform: translateX(3px);
  color: var(--text-muted);
}

@media (max-width: 600px) {
  .hero-card { flex-direction: column; text-align: center; padding: 1.75rem 1.25rem; }
  .hero-illustration { font-size: 3.5rem; }
  .hero-stats { justify-content: center; }
  .hero-title { font-size: 1.5rem; }
}
</style>
