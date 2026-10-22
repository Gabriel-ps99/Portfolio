export type Lang = "pt" | "en";

export const content = {
  pt: {
    meta: {
      title: "Gabriel Silva | Desenvolvedor OutSystems & Full Stack",
      description:
        "Portfólio de Gabriel Pereira da Silva, desenvolvedor OutSystems e Full Stack em Goiânia.",
    },
    nav: {
      about: "Sobre",
      skills: "Tecnologias",
      projects: "Projetos",
      experience: "Experiência",
      contact: "Contato",
      whatsapp: "WhatsApp",
    },
    hero: {
      eyebrow: "Desenvolvedor OutSystems | Full Stack",
      lines: ["Gabriel", "Pereira", "da Silva"],
      tagline:
        "Construo sistemas web que resolvem problemas reais de negócio, de aplicações corporativas a produtos sob demanda.",
      explore: "Explorar",
    },
    about: {
      title: "Sobre mim",
      text: "Desenvolvedor de Software com experiência em OutSystems, React e Next.js. Atuação em projetos institucionais e soluções para clientes, envolvendo desenvolvimento, manutenção de sistemas, análise de requisitos e resolução de problemas. Facilidade para aprender novas tecnologias e compreender regras de negócio.",
      education: "Formação",
      degrees: [
        {
          name: "Engenharia de Software (Bacharelado)",
          place: "Uni-Anhanguera",
          period: "2023 – 2026 · Cursando",
        },
      ],
      languages: "Idiomas",
      langList: [
        { name: "Português", level: "Nativo" },
        { name: "Inglês", level: "Intermediário (documentação técnica)" },
      ],
      location: "Goiânia, GO",
    },
    skills: {
      title: "Tecnologias",
      intro: "Ferramentas com as quais trabalho no dia a dia.",
      groups: [
        {
          name: "OutSystems",
          items: ["Service Studio", "Reactive Web Apps", "REST APIs", "Modelagem de Dados"],
        },
        {
          name: "Frontend",
          items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
        },
        { name: "Backend", items: ["Laravel", "PHP", "REST APIs"] },
        { name: "Banco de Dados", items: ["SQL", "MySQL", "Supabase"] },
        { name: "Ferramentas", items: ["Git", "GitHub"] },
      ],
    },
    projects: {
      title: "Projetos",
      intro: "Um sistema corporativo em OutSystems e sites desenvolvidos para clientes.",
      visit: "Ver site",
      code: "Código",
      areasLabel: "Áreas atendidas",
      items: [
        {
          name: "Sistemas de gestão municipal",
          category: "Case · OutSystems",
          desc: "Aplicações internas e externas para a Prefeitura de Goiânia, usadas por equipes administrativas no dia a dia. Responsável por modelagem de dados, integrações com APIs, regras de negócio e manutenção em produção.",
          stack: ["OutSystems", "Modelagem de Dados", "REST APIs", "Regras de negócio"],
          logo: "projects/outsystems-logo.png",
          areas: [
            "Tributação e arrecadação",
            "Saúde",
            "Licenciamento ambiental e uso do solo",
            "Aprovação de projetos e alvarás",
            "Gestão de pessoal e previdência",
            "Proteção social",
            "Fiscalização",
            "Atendimento ao cidadão",
          ],
          image: "",
          live: "",
          repo: "",
        },
        {
          name: "Oliveira Móveis Planejados",
          category: "Landing page · Marcenaria",
          desc: "Site institucional de uma marcenaria de móveis sob medida, com galeria de projetos, formulário de orçamento e botão de WhatsApp.",
          stack: ["React", "TypeScript", "Vite", "PHP"],
          image: "projects/oliveira.jpg",
          live: "https://oliveiramoveis.top",
          repo: "https://github.com/Gabriel-ps99/Oliveira-Moveis-Planejados",
        },
        {
          name: "2Call Cuiabá",
          category: "Landing page · SMS Marketing",
          desc: "Landing page de SMS marketing em massa, com tema-filho WordPress (Hello Elementor) pronto para instalação.",
          stack: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"],
          image: "projects/2call.png",
          live: "https://2callcuiaba.com.br",
          repo: "https://github.com/Gabriel-ps99/2CALL",
        },
        {
          name: "Lima Burguer",
          category: "Landing page · E-book",
          desc: "Página única e responsiva de venda de um e-book de hamburgueria, com seções de diferenciais, conteúdo e chamada para compra.",
          stack: ["HTML", "CSS"],
          image: "projects/lima-burguer.png",
          live: "",
          repo: "https://github.com/Gabriel-ps99/Lima-Burguer",
        },
      ],
    },
    experience: {
      title: "Experiência",
      jobs: [
        {
          role: "Desenvolvedor de Software (PJ)",
          company: "Argo Inteligência Digital",
          period: "Jul 2026 – Atual",
          bullets: [
            "Desenvolvimento de soluções de software sob demanda para clientes",
            "Atuação em projetos de tecnologia com foco em eficiência e redução de custos",
            "Levantamento de requisitos e proposição de soluções tecnológicas inovadoras",
            "Manutenção e evolução de sistemas em produção",
          ],
        },
        {
          role: "Desenvolvedor OutSystems",
          company: "Prefeitura de Goiânia",
          period: "Jun 2024 – Jun 2026",
          bullets: [
            "Desenvolvimento e manutenção de aplicações corporativas utilizando OutSystems",
            "Implementação de melhorias e correções em sistemas internos",
            "Levantamento e análise de requisitos junto às áreas de negócio",
            "Manipulação de dados e integração entre sistemas",
            "Suporte aos usuários internos",
          ],
        },
        {
          role: "Desenvolvedor Freelancer",
          company: "Autônomo",
          period: "2023 – Atual",
          bullets: [
            "Desenvolvimento de aplicações web completas",
            "Construção de interfaces responsivas",
            "Integração com bancos de dados e APIs",
            "Manutenção e evolução de sistemas",
            "Levantamento de requisitos junto aos clientes",
          ],
        },
        {
          role: "Estagiário",
          company: "PROCON-GO / SSP-GO",
          period: "Jul 2021 – Dez 2022",
          bullets: [
            "Atuação na gerência de fiscalização",
            "Apoio em processos administrativos e rotinas operacionais",
            "Experiência com legislação consumerista",
          ],
        },
      ],
    },
    footer: {
      kicker: "Vamos conversar?",
      cta: "Fale comigo",
      blurb: "Desenvolvedor OutSystems e Full Stack em Goiânia, GO.",
      links: "Links",
      contact: "Contato",
      rights: "Todos os direitos reservados.",
      whatsappMessage: "Olá, Gabriel! Vi o seu portfólio e gostaria de conversar.",
    },
  },
  en: {
    meta: {
      title: "Gabriel Silva | OutSystems & Full Stack Developer",
      description:
        "Portfolio of Gabriel Pereira da Silva, OutSystems and Full Stack developer based in Goiânia, Brazil.",
    },
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      whatsapp: "WhatsApp",
    },
    hero: {
      eyebrow: "OutSystems Developer | Full Stack",
      lines: ["Gabriel", "Pereira", "da Silva"],
      tagline:
        "I build web systems that solve real business problems, from enterprise applications to on-demand products.",
      explore: "Explore",
    },
    about: {
      title: "About me",
      text: "Software Developer with experience in OutSystems 11, React and Next.js. Background in institutional projects and client solutions, covering development, system maintenance, requirements analysis and problem-solving. Quick to learn new technologies and understand business rules.",
      education: "Education",
      degrees: [
        {
          name: "Software Engineering (Bachelor's Degree)",
          place: "Uni-Anhanguera",
          period: "2023 – 2026 · In progress",
        },
      ],
      languages: "Languages",
      langList: [
        { name: "Portuguese", level: "Native" },
        { name: "English", level: "Intermediate (technical documentation)" },
      ],
      location: "Goiânia, Brazil",
    },
    skills: {
      title: "Skills",
      intro: "Tools I work with day to day.",
      groups: [
        {
          name: "OutSystems",
          items: ["Service Studio", "Reactive Web Apps", "REST APIs", "Data Modeling"],
        },
        {
          name: "Frontend",
          items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
        },
        { name: "Backend", items: ["Laravel", "PHP", "REST APIs"] },
        { name: "Databases", items: ["SQL", "MySQL", "Supabase"] },
        { name: "Tools", items: ["Git", "GitHub"] },
      ],
    },
    projects: {
      title: "Projects",
      intro: "An enterprise system built with OutSystems and websites developed for clients.",
      visit: "Visit site",
      code: "Code",
      areasLabel: "Areas covered",
      items: [
        {
          name: "Municipal management systems",
          category: "Case · OutSystems",
          desc: "Internal and public-facing applications for the Goiânia City Government, used daily by administrative teams. Responsible for data modeling, API integrations, business rules and production maintenance.",
          stack: ["OutSystems", "Data Modeling", "REST APIs", "Business rules"],
          logo: "projects/outsystems-logo.png",
          areas: [
            "Taxation and revenue",
            "Healthcare",
            "Environmental licensing and land use",
            "Project and permit approval",
            "Staff and pension management",
            "Social protection",
            "Inspection",
            "Citizen services",
          ],
          image: "",
          live: "",
          repo: "",
        },
        {
          name: "Oliveira Móveis Planejados",
          category: "Landing page · Custom furniture",
          desc: "Company website for a custom furniture workshop, with a project gallery, quote request form and WhatsApp button.",
          stack: ["React", "TypeScript", "Vite", "PHP"],
          image: "projects/oliveira.jpg",
          live: "https://oliveiramoveis.top",
          repo: "https://github.com/Gabriel-ps99/Oliveira-Moveis-Planejados",
        },
        {
          name: "2Call Cuiabá",
          category: "Landing page · SMS Marketing",
          desc: "Bulk SMS marketing landing page, with a ready-to-install WordPress child theme (Hello Elementor).",
          stack: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"],
          image: "projects/2call.png",
          live: "https://2callcuiaba.com.br",
          repo: "https://github.com/Gabriel-ps99/2CALL",
        },
        {
          name: "Lima Burguer",
          category: "Landing page · E-book",
          desc: "Responsive single-page sales site for a burger recipe e-book, with highlights, content and a purchase call to action.",
          stack: ["HTML", "CSS"],
          image: "projects/lima-burguer.png",
          live: "",
          repo: "https://github.com/Gabriel-ps99/Lima-Burguer",
        },
      ],
    },
    experience: {
      title: "Experience",
      jobs: [
        {
          role: "Software Developer (Contractor)",
          company: "Argo Inteligência Digital",
          period: "Jul 2026 – Present",
          bullets: [
            "Development of on-demand software solutions for clients",
            "Work on technology projects focused on efficiency and cost reduction",
            "Requirements gathering and proposal of innovative technical solutions",
            "Maintenance and evolution of production systems",
          ],
        },
        {
          role: "OutSystems Developer",
          company: "Goiânia City Government",
          period: "Jun 2024 – Jun 2026",
          bullets: [
            "Development and maintenance of enterprise applications using OutSystems",
            "Implementation of improvements and fixes on internal systems",
            "Requirements gathering and analysis with business stakeholders",
            "Data handling and system integrations",
            "Support for internal users",
          ],
        },
        {
          role: "Freelance Developer",
          company: "Self-employed",
          period: "2023 – Present",
          bullets: [
            "Development of complete web applications",
            "Building responsive interfaces",
            "Integration with databases and APIs",
            "Maintenance and evolution of systems",
            "Requirements gathering with clients",
          ],
        },
        {
          role: "Intern",
          company: "PROCON-GO / SSP-GO",
          period: "Jul 2021 – Dec 2022",
          bullets: [
            "Worked in the inspection management unit",
            "Support for administrative processes and daily operations",
            "Experience with consumer protection law",
          ],
        },
      ],
    },
    footer: {
      kicker: "Let's talk?",
      cta: "Get in touch",
      blurb: "OutSystems and Full Stack developer based in Goiânia, Brazil.",
      links: "Links",
      contact: "Contact",
      rights: "All rights reserved.",
      whatsappMessage: "Hi Gabriel! I saw your portfolio and would like to talk.",
    },
  },
} as const;

export type Content = (typeof content)[Lang];
