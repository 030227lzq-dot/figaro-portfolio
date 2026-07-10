export type Locale = "zh" | "en";

export type LocalizedText = Record<Locale, string>;

export type Profile = {
  name: LocalizedText;
  title: LocalizedText;
  city: LocalizedText;
  intro: LocalizedText;
  contact: {
    email: string;
    availability: LocalizedText;
  };
  socials: Array<{
    label: string;
    value: string;
  }>;
};

export type Category = {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  symbol: string;
};

export type Project = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  categoryId: string;
  year: string;
  role: LocalizedText;
  tools: string[];
  mediaKind: "video";
  featured: boolean;
  media: {
    src: string;
    poster: string;
    orientation: "wide" | "square" | "portrait" | "tower";
    duration: string;
  };
};

export type SkillGroup = {
  label: LocalizedText;
  items: string[];
};

export const profile: Profile = {
  name: {
    zh: "A 个人作品集",
    en: "A Personal Portfolio"
  },
  title: {
    zh: "三维视觉设计师 / 暗黑视觉创作者",
    en: "3D Visual Designer / Dark Visual Artist"
  },
  city: {
    zh: "城市待填写",
    en: "City to be added"
  },
  intro: {
    zh:
      "以三维视觉、动态影像和仪式化视觉语言构建个人艺术档案。当前版本已接入本地作品集视频，个人资料仍保留为可替换占位。",
    en:
      "A personal archive for 3D visuals, motion images, and ritual visual systems. Video works are connected; profile details remain replaceable."
  },
  contact: {
    email: "YOUR_EMAIL_HERE",
    availability: {
      zh: "开放合作：三维视觉、动态影像、人物视觉、艺术短片",
      en: "Open for 3D visuals, motion pieces, portrait systems, and art films"
    }
  },
  socials: [
    { label: "抖音", value: "FigaroLilX" },
    { label: "小红书", value: "F!garo Dear" }
  ]
};

export const categories: Category[] = [
  {
    id: "sculpture",
    title: { zh: "三维雕塑", en: "3D Sculpture" },
    subtitle: {
      zh: "骨骼、心脏、花、荆棘与圣像式物件研究",
      en: "Bones, hearts, flowers, thorns, and icon-like object studies"
    },
    symbol: "I"
  },
  {
    id: "motion",
    title: { zh: "动态影像", en: "Motion Image" },
    subtitle: {
      zh: "循环镜头、恶循系列、暗黑氛围短片",
      en: "Looping shots, VICIOCYC series, and dark cinematic fragments"
    },
    symbol: "II"
  },
  {
    id: "portrait",
    title: { zh: "人物视觉", en: "Portrait Visuals" },
    subtitle: {
      zh: "人物、身体、面部与视觉身份的风格化实验",
      en: "Stylized studies of identity, body, face, and presence"
    },
    symbol: "III"
  },
  {
    id: "concept",
    title: { zh: "概念实验", en: "Concept Studies" },
    subtitle: {
      zh: "空间、图书馆、沼泽、全景与视觉系统实验",
      en: "Spaces, libraries, swamps, panoramas, and visual system studies"
    },
    symbol: "IV"
  }
];

export const projects: Project[] = [
  {
    id: "v1-complete",
    title: { zh: "案例V1", en: "Case V1" },
    description: {
      zh: "纵向三维视觉短片，适合作为作品集首页后的强视觉入口。",
      en: "A vertical 3D visual film used as a strong visual entry for the archive."
    },
    categoryId: "sculpture",
    year: "2026",
    role: { zh: "三维视觉 / 动态影像 / 后期", en: "3D Visual / Motion / Post" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: true,
    media: {
      src: "/media/videos/p10_v1_complete.mp4",
      poster: "/media/posters/p10_v1_complete.jpg",
      orientation: "portrait",
      duration: "24.6s"
    }
  },
  {
    id: "figaro-2026",
    title: { zh: "案例V2", en: "Case V2" },
    description: {
      zh: "横向人物视觉作品，适合放在人物视觉板块中作为视觉身份案例。",
      en: "A horizontal portrait visual piece for the identity and portrait section."
    },
    categoryId: "portrait",
    year: "2026",
    role: { zh: "人物视觉 / 合成 / 调色", en: "Portrait Visual / Compositing / Color" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: true,
    media: {
      src: "/media/videos/p02_2026_figaro.mp4",
      poster: "/media/posters/p02_2026_figaro.jpg",
      orientation: "wide",
      duration: "21.7s"
    }
  },
  {
    id: "classical-library",
    title: { zh: "案例V3", en: "Case V3" },
    description: {
      zh: "纵向空间影像，连接中世纪、档案馆、古典建筑和视觉叙事。",
      en: "A vertical spatial film connecting medieval archives, classical architecture, and visual narrative."
    },
    categoryId: "concept",
    year: "2025",
    role: { zh: "空间概念 / 镜头 / 氛围", en: "Spatial Concept / Camera / Atmosphere" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: true,
    media: {
      src: "/media/videos/p13_classical_library.mp4",
      poster: "/media/posters/p13_classical_library.jpg",
      orientation: "portrait",
      duration: "18s"
    }
  },
  {
    id: "viciocyc-trio",
    title: { zh: "案例V4", en: "Case V4" },
    description: {
      zh: "超纵向系列影像，适合作为恶循系列的主案例入口。",
      en: "An ultra-vertical entry for the VICIOCYC series."
    },
    categoryId: "motion",
    year: "2026",
    role: { zh: "系列视觉 / 动态 / 合成", en: "Series Visual / Motion / Compositing" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: true,
    media: {
      src: "/media/videos/p11_viciocyc_trio.mp4",
      poster: "/media/posters/p11_viciocyc_trio.jpg",
      orientation: "tower",
      duration: "15s"
    }
  },
  {
    id: "heart",
    title: { zh: "案例V5", en: "Case V5" },
    description: {
      zh: "横向三维器官视觉，适合归入圣物、身体和暗黑雕塑方向。",
      en: "A horizontal organ visual for relic, body, and dark sculpture studies."
    },
    categoryId: "sculpture",
    year: "2024",
    role: { zh: "造型 / 材质 / 镜头", en: "Modeling / Material / Camera" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: true,
    media: {
      src: "/media/videos/p05_heart.mp4",
      poster: "/media/posters/p05_heart.jpg",
      orientation: "wide",
      duration: "15s"
    }
  },
  {
    id: "thorn-rose",
    title: { zh: "案例V6", en: "Case V6" },
    description: {
      zh: "方形短片，作为荆棘、花、暗黑浪漫符号的作品入口。",
      en: "A square film for thorns, flowers, and dark romantic symbolism."
    },
    categoryId: "sculpture",
    year: "2024",
    role: { zh: "视觉设定 / 动态 / 后期", en: "Art Direction / Motion / Post" },
    tools: ["Blender", "After Effects", "Illustrator"],
    mediaKind: "video",
    featured: true,
    media: {
      src: "/media/videos/p18_thorn_rose.mp4",
      poster: "/media/posters/p18_thorn_rose.jpg",
      orientation: "square",
      duration: "10s"
    }
  },
  {
    id: "duerdose",
    title: { zh: "案例V7", en: "Case V7" },
    description: {
      zh: "横向动态影像作品，保留原始标题作为系列识别。",
      en: "A horizontal motion piece keeping its original series title."
    },
    categoryId: "motion",
    year: "2025",
    role: { zh: "动态设计 / 合成 / 调色", en: "Motion Design / Compositing / Color" },
    tools: ["After Effects", "DaVinci Resolve", "Blender"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p03_duerdose.mp4",
      poster: "/media/posters/p03_duerdose.jpg",
      orientation: "wide",
      duration: "15s"
    }
  },
  {
    id: "savage",
    title: { zh: "案例V8", en: "Case V8" },
    description: {
      zh: "横向暗黑动态作品，适合作为更具冲击力的影像案例。",
      en: "A horizontal dark motion piece with a more aggressive visual tone."
    },
    categoryId: "motion",
    year: "2025",
    role: { zh: "动态影像 / 节奏 / 后期", en: "Motion Image / Rhythm / Post" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p08_savage.mp4",
      poster: "/media/posters/p08_savage.jpg",
      orientation: "wide",
      duration: "20s"
    }
  },
  {
    id: "swamp",
    title: { zh: "案例V9", en: "Case V9" },
    description: {
      zh: "横向环境视觉，适合放入概念空间和气氛实验方向。",
      en: "A horizontal environment visual for atmosphere and concept-space studies."
    },
    categoryId: "concept",
    year: "2024",
    role: { zh: "环境 / 镜头 / 氛围", en: "Environment / Camera / Atmosphere" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p09_swamp.mp4",
      poster: "/media/posters/p09_swamp.jpg",
      orientation: "wide",
      duration: "20s"
    }
  },
  {
    id: "sad-remake",
    title: { zh: "案例V10", en: "Case V10" },
    description: {
      zh: "横向重制影像，用于展示同一视觉主题的再加工能力。",
      en: "A remake piece showing refinement and reinterpretation of a visual theme."
    },
    categoryId: "motion",
    year: "2024",
    role: { zh: "重制 / 剪辑 / 氛围", en: "Remake / Edit / Atmosphere" },
    tools: ["After Effects", "DaVinci Resolve", "Blender"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p07_sad_remake.mp4",
      poster: "/media/posters/p07_sad_remake.jpg",
      orientation: "wide",
      duration: "21s"
    }
  },
  {
    id: "viciocyc-red-purple",
    title: { zh: "案例V11", en: "Case V11" },
    description: {
      zh: "恶循系列红紫版本，用色彩区分系列情绪。",
      en: "A red-purple variation of the VICIOCYC series."
    },
    categoryId: "motion",
    year: "2026",
    role: { zh: "系列版本 / 色彩 / 动态", en: "Series Version / Color / Motion" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p17_viciocyc_red_purple.mp4",
      poster: "/media/posters/p17_viciocyc_red_purple.jpg",
      orientation: "wide",
      duration: "15s"
    }
  },
  {
    id: "viciocyc-blue-purple",
    title: { zh: "案例V12", en: "Case V12" },
    description: {
      zh: "恶循系列蓝紫版本，偏冷色、迷离和电子化气质。",
      en: "A blue-purple variation with a colder and more digital tone."
    },
    categoryId: "motion",
    year: "2026",
    role: { zh: "系列版本 / 色彩 / 动态", en: "Series Version / Color / Motion" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p20_viciocyc_blue_purple.mp4",
      poster: "/media/posters/p20_viciocyc_blue_purple.jpg",
      orientation: "wide",
      duration: "15s"
    }
  },
  {
    id: "viciocyc-blue-green",
    title: { zh: "案例V13", en: "Case V13" },
    description: {
      zh: "恶循系列蓝绿版本，延展系列的色彩与气氛范围。",
      en: "A blue-green variation extending the color and atmosphere of the series."
    },
    categoryId: "motion",
    year: "2026",
    role: { zh: "系列版本 / 色彩 / 动态", en: "Series Version / Color / Motion" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p21_viciocyc_blue_green.mp4",
      poster: "/media/posters/p21_viciocyc_blue_green.jpg",
      orientation: "wide",
      duration: "15s"
    }
  },
  {
    id: "f",
    title: { zh: "案例V14", en: "Case V14" },
    description: {
      zh: "纵向人物视觉作品，适合移动端和社媒展示比例。",
      en: "A vertical portrait visual suited for mobile and social presentation."
    },
    categoryId: "portrait",
    year: "2025",
    role: { zh: "人物视觉 / 合成 / 后期", en: "Portrait Visual / Compositing / Post" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p04_f.mp4",
      poster: "/media/posters/p04_f.jpg",
      orientation: "portrait",
      duration: "10s"
    }
  },
  {
    id: "02f",
    title: { zh: "案例V15", en: "Case V15" },
    description: {
      zh: "方形人物视觉短片，保留原始编号式命名。",
      en: "A square portrait visual retaining its original numbered title."
    },
    categoryId: "portrait",
    year: "2024",
    role: { zh: "人物视觉 / 动态 / 后期", en: "Portrait Visual / Motion / Post" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p01_02f.mp4",
      poster: "/media/posters/p01_02f.jpg",
      orientation: "square",
      duration: "15s"
    }
  },
  {
    id: "hsyeggs",
    title: { zh: "案例V16", en: "Case V16" },
    description: {
      zh: "方形实验影像，适合归入符号和视觉实验分支。",
      en: "A square experimental film for symbolic and visual studies."
    },
    categoryId: "concept",
    year: "2024",
    role: { zh: "视觉实验 / 动态 / 合成", en: "Visual Study / Motion / Compositing" },
    tools: ["Blender", "After Effects", "Illustrator"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p06_hsyeggs.mp4",
      poster: "/media/posters/p06_hsyeggs.jpg",
      orientation: "square",
      duration: "15s"
    }
  },
  {
    id: "panorama",
    title: { zh: "案例V17", en: "Case V17" },
    description: {
      zh: "横向场景影像，用于展示空间、镜头和气氛控制。",
      en: "A horizontal scene film for space, camera, and atmosphere control."
    },
    categoryId: "concept",
    year: "2024",
    role: { zh: "空间 / 镜头 / 后期", en: "Space / Camera / Post" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p12_panorama.mp4",
      poster: "/media/posters/p12_panorama.jpg",
      orientation: "wide",
      duration: "15s"
    }
  },
  {
    id: "composite",
    title: { zh: "案例V18", en: "Case V18" },
    description: {
      zh: "方形合成练习，展示后期、画面组织和视觉统一能力。",
      en: "A square compositing study for post-production and visual organization."
    },
    categoryId: "concept",
    year: "2025",
    role: { zh: "合成 / 后期 / 调色", en: "Compositing / Post / Color" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p14_composite.mp4",
      poster: "/media/posters/p14_composite.jpg",
      orientation: "square",
      duration: "15s"
    }
  },
  {
    id: "composite-1",
    title: { zh: "案例V19", en: "Case V19" },
    description: {
      zh: "方形合成延展作品，用于补充展示图像后期方向。",
      en: "A square extension piece for image compositing and post-production."
    },
    categoryId: "concept",
    year: "2024",
    role: { zh: "合成 / 后期 / 调色", en: "Compositing / Post / Color" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p15_composite_1.mp4",
      poster: "/media/posters/p15_composite_1.jpg",
      orientation: "square",
      duration: "15s"
    }
  },
  {
    id: "dead-flower",
    title: { zh: "案例V20", en: "Case V20" },
    description: {
      zh: "短纵向作品，适合作为花、腐朽和暗黑浪漫视觉的补充。",
      en: "A short vertical work for flowers, decay, and dark romantic imagery."
    },
    categoryId: "sculpture",
    year: "2025",
    role: { zh: "视觉设定 / 动态 / 后期", en: "Art Direction / Motion / Post" },
    tools: ["Blender", "After Effects", "Illustrator"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p16_dead_flower.mp4",
      poster: "/media/posters/p16_dead_flower.jpg",
      orientation: "portrait",
      duration: "3s"
    }
  },
  {
    id: "sunflower-md",
    title: { zh: "案例V21", en: "Case V21" },
    description: {
      zh: "横向三维服装/形体方向作品，适合补充雕塑和动态造型板块。",
      en: "A horizontal 3D garment or form study for sculptural motion work."
    },
    categoryId: "sculpture",
    year: "2024",
    role: { zh: "三维造型 / 材质 / 动态", en: "3D Form / Material / Motion" },
    tools: ["Blender", "After Effects", "DaVinci Resolve"],
    mediaKind: "video",
    featured: false,
    media: {
      src: "/media/videos/p19_sunflower_md.mp4",
      poster: "/media/posters/p19_sunflower_md.jpg",
      orientation: "wide",
      duration: "15s"
    }
  }
];

export const skills: SkillGroup[] = [
  {
    label: { zh: "三维", en: "3D" },
    items: ["Blender"]
  },
  {
    label: { zh: "动态", en: "Motion" },
    items: ["After Effects"]
  },
  {
    label: { zh: "剪辑调色", en: "Edit / Color" },
    items: ["DaVinci Resolve"]
  },
  {
    label: { zh: "字体", en: "Typography" },
    items: ["Illustrator"]
  },
  {
    label: { zh: "风格", en: "Style" },
    items: ["Gothic", "Medieval", "Dark Ritual", "Sacred Anatomy"]
  }
];
