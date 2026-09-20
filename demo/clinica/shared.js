/* Clínica Claridade — shared helpers */
(function () {
  'use strict';

  const SERVICES = [
    {
      id: 'geral',
      name: 'Consulta de clínica geral',
      desc: 'Avaliação inicial, orientação terapêutica e plano de seguimento. ~30 min.',
      price: 65,
      duration: '30 min',
    },
    {
      id: 'seguimento',
      name: 'Consulta de seguimento',
      desc: 'Reavaliação de tratamentos em curso e revisão de análises. ~20 min.',
      price: 45,
      duration: '20 min',
    },
    {
      id: 'checkup',
      name: 'Check-up preventivo',
      desc: 'Avaliação global de saúde com pedido de exames quando indicado. ~40 min.',
      price: 95,
      duration: '40 min',
    },
    {
      id: 'urgente',
      name: 'Consulta prioritária',
      desc: 'Para sintomas agudos no próprio dia, sujeita a disponibilidade. ~25 min.',
      price: 85,
      duration: '25 min',
    },
    {
      id: 'tele',
      name: 'Teleconsulta',
      desc: 'Consulta por videochamada para seguimento e questões clínicas adequadas. ~20 min.',
      price: 40,
      duration: '20 min',
    },
    {
      id: 'certificado',
      name: 'Atestado / certificado médico',
      desc: 'Emissão de atestado ou certificado após avaliação clínica. ~15 min.',
      price: 35,
      duration: '15 min',
    },
  ];

  const DOCTOR = {
    name: 'Dra. Ana Luísa Mendes',
    title: 'Médica de família',
    creds: [
      'Cédula profissional OM 58921',
      'Especialidade em Medicina Geral e Familiar',
      '12 anos de prática clínica',
      'Formação: Faculdade de Medicina da Universidade de Lisboa',
    ],
  };

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function formatEuro(n) {
    return Number(n).toLocaleString('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  function getNextDays(count) {
    const days = [];
    const now = new Date();
    let d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    while (days.length < count) {
      const wd = d.getDay();
      if (wd !== 0) {
        days.push({
          key: d.toISOString().slice(0, 10),
          label: weekdays[wd],
          day: String(d.getDate()).padStart(2, '0'),
          month: String(d.getMonth() + 1).padStart(2, '0'),
          isSat: wd === 6,
        });
      }
      d.setDate(d.getDate() + 1);
    }
    return days;
  }

  function slotsForDay(day) {
    const morning = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
    const afternoon = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
    const sat = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'];
    const list = day.isSat ? sat : morning.concat(afternoon);
    // Deterministic "taken" slots for demo realism
    const taken = new Set();
    const seed = day.key.split('-').reduce((a, b) => a + Number(b), 0);
    list.forEach((t, i) => {
      if ((seed + i) % 5 === 0) taken.add(t);
    });
    return list.map((t) => ({ time: t, available: !taken.has(t) }));
  }

  function genRef() {
    const n = Math.floor(100000 + Math.random() * 900000);
    return 'CC-' + n;
  }

  window.Claridade = {
    SERVICES,
    DOCTOR,
    qs,
    qsa,
    formatEuro,
    getNextDays,
    slotsForDay,
    genRef,
  };
})();
