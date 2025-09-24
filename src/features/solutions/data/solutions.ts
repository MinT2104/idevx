import { SolutionsData } from "../types";

const solutionsData: SolutionsData = {
  "image-processing": {
    sections: [
      {
        id: "hero",
        type: "hero",
        props: {
          title: "Transforming",
          subtitle: "ideas into images",
          description:
            "Turn concepts into stunning visuals in seconds. With DevX, you can generate product shots, ads, learning material, and creative assets sing the best open-source and commercial AI models. Whether for business or education, our image generation tools bring your ideas to life—fast, flexible, and scalable.",
          buttons: [
            {
              text: "Get Started",
              variant: "outline",
              size: "lg",
            },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
            },
          ],
        },
      },
      {
        id: "trusted-by",
        type: "trusted-by",
        title: "Trusted by top engineering and machine learning teams",
        logos: [
          {
            src: "https://www.datocms-assets.com/104802/1758662941-logo-writer.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Writter",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663023-zed-industries.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "zed_industry",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740008335-664287c9ef936d8ce43517f8_abridge-logo-wordmark-black.webp?auto=compress%2Cformat&fit=clip&h=50",
            alt: "abridge",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1752855457-clay-logo-dark-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "clay",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663169-sourcegraph_logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "sourcegraph",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663041-superhuman_id2iogfm7h_1-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "superhuman",
            className: "h-2 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740157858-bland-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Bland AI logo",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662897-logo-descript.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "descript",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663073-ambience-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "ambience",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662918-retool.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "retool",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1747248934-gamma-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "gamma",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1742563823-quora.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "quora",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758136309-openevidence-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "openevidence",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662984-logo-picnic.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "picnic",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663002-hex.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "hex",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1724272610-wispr.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "wispr",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663105-canopy.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "canopy",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662959-logo-patreon.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "patreon",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663144-cisco.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "cisco",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663176-logo-rime.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "rime",
            className: "h-4 w-auto",
          },
        ],
      },
      {
        id: "testimonial-1",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "DevX AI completely changed how we handle marketing visuals. What used to take our design team a week, we now generate in minutes without compromising quality. The mix of open-source and commercial models gave us both flexibility and scale",
        author: {
          name: "Sarah Mitchell",
          title: "Marketing Director, BrightWave Solutions",
          nameClassName: "font-semibold text-orange-600 text-xl mb-1",
          titleClassName: "text-sm text-slate-600",
          avatar: {
            src: "/images/client_1.png",
          },
        },
      },
      {
        id: "ai-powered-image",
        type: "grid",
        backgroundColor: "white",
        tag: "Image Processing",
        title: "AI-Powered Image Processing, Without Limits",
        description:
          "DevX enables you to generate, edit, and enhance images—powered by the best open-source models (Stable Diffusion, DALL-E, Midjourney) and commercial APIs (OpenAI, Adobe Firefly, Runway).",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Instant Results",
            description: "High-quality outputs in seconds.",
          },
          {
            icon: true,
            title: "Flexible Models",
            description: "Choose from open-source or commercial providers.",
          },
          {
            icon: true,
            title: "Enterprise Ready",
            description: "Scalable, secure, and compliant.",
          },
        ],
      },
      {
        id: "accuracy-without-barriers",
        type: "grid",
        backgroundColor: "gray",
        title: "Accuracy Without Barriers",
        subtitle: "Reliable image processing for any product.",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Multi-Model Flexibility",
            description:
              "Switch between open-source models like Stable Diffusion or commercial APIs for speed, scale, and performance.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Domain Adaptation",
            description:
              "Fine-tune models for healthcare, legal, media, or education to ensure industry-level accuracy.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Enterprise-Scale Output",
            description:
              "From single images to bulk processing, DevX handles massive workloads with security, compliance, and efficiency.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "commercial-models",
        type: "grid",
        backgroundColor: "white",
        title: "Commercial Image Generation Models",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: "/images/models/deepseek.png",
            title: "DALL·E (OpenAI)",
            description:
              "Commercial API for quick, reliable, and creative image generation—ideal for marketing visuals, product shots, and branded assets.",
          },
          {
            icon: "/images/models/meta.png",
            title: "MidJourney",
            description:
              "A leading creative model for artistic, photorealistic, and stylistic visuals widely used by designers and creators.",
          },
          {
            icon: true,
            title: "Adobe Firefly",
            description:
              "Adobe's enterprise-grade AI, built into Creative Cloud, delivering brand-safe, commercially usable images with strong editing tools.",
          },
        ],
      },
      {
        id: "opensource-models",
        type: "grid",
        backgroundColor: "gray",
        title: "Open-Source Models",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Stable Diffusion",
            description:
              "Open-source text-to-image model with high customization and community support.",
          },
          {
            icon: true,
            title: "DALL-E Mini",
            description:
              "Lightweight open-source alternative for quick image generation.",
          },
          {
            icon: true,
            title: "Runway ML",
            description:
              "Creative AI tools for image and video generation with professional features.",
          },
          {
            icon: true,
            title: "Craiyon",
            description:
              "Free AI art generator with simple interface and good results.",
          },
          {
            icon: true,
            title: "Midjourney Open",
            description:
              "Community-driven image generation with artistic focus.",
          },
          {
            icon: true,
            title: "Disco Diffusion",
            description:
              "Advanced open-source model for artistic and creative image generation.",
          },
        ],
      },
      {
        id: "testimonial-2",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "As an edtech company, we needed transcripts for every lecture. With DevX AI's speech recognition, we automated our workflow, making education more accessible and cost-effective for students worldwide.",
        author: {
          name: "Rohit Mehta",
          title: "Founder, EduVerse Global",
          nameClassName: "font-semibold text-orange-600 text-xl mb-1",
          titleClassName: "text-sm text-slate-600",
          avatar: {
            src: "/images/client_2.png",
          },
        },
      },
      {
        id: "explore-devx",
        type: "component",
        component: "ExporeDevxToday",
      },
    ],
  },
  "speech-to-text": {
    sections: [
      {
        id: "hero",
        type: "hero",
        props: {
          title: "Transforming",
          subtitle: "Speech into Text",
          description:
            "Turn conversations, lectures, and calls into accurate transcripts in seconds. With DevX, you can capture meetings, podcasts, learning content, and business calls using the best open-source and commercial ASR models. Fast, flexible, and scalable speech-to-text for every need.",
          buttons: [
            {
              text: "Get Started",
              variant: "outline",
              size: "lg",
            },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
            },
          ],
        },
      },
      {
        id: "trusted-by",
        type: "trusted-by",
        title: "Trusted by top engineering and machine learning teams",
        logos: [
          {
            src: "https://www.datocms-assets.com/104802/1758662941-logo-writer.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Writter",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663023-zed-industries.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "zed_industry",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740008335-664287c9ef936d8ce43517f8_abridge-logo-wordmark-black.webp?auto=compress%2Cformat&fit=clip&h=50",
            alt: "abridge",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1752855457-clay-logo-dark-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "clay",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663169-sourcegraph_logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "sourcegraph",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663041-superhuman_id2iogfm7h_1-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "superhuman",
            className: "h-2 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740157858-bland-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Bland AI logo",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662897-logo-descript.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "descript",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663073-ambience-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "ambience",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662918-retool.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "retool",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1747248934-gamma-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "gamma",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1742563823-quora.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "quora",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758136309-openevidence-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "openevidence",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662984-logo-picnic.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "picnic",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663002-hex.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "hex",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1724272610-wispr.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "wispr",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663105-canopy.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "canopy",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662959-logo-patreon.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "patreon",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663144-cisco.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "cisco",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663176-logo-rime.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "rime",
            className: "h-4 w-auto",
          },
        ],
      },
      {
        id: "testimonial-1",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "DevX AI transformed how we handle meeting documentation. What used to take hours of manual note-taking is now delivered instantly with high accuracy. The balance of open-source and commercial models gives us unmatched reliability and scale.",
        author: {
          name: "Anita Verma",
          title: "Operations Manager, ClearWave Tech",
          nameClassName: "font-semibold text-orange-600 text-xl mb-1",
          titleClassName: "text-sm text-slate-600",
          avatar: {
            src: "/images/client_1.png",
          },
        },
      },
      {
        id: "ai-powered-speech",
        type: "grid",
        backgroundColor: "white",
        tag: "Speech to Text",
        title: "AI-Powered Speech Recognition, Without Limits",
        description:
          "DevX enables you to transcribe calls, lectures, and media content—powered by the best open-source models (Whisper, Wav2Vec, Coqui STT) and commercial APIs (Deepgram, AssemblyAI, Rev).",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Instant Results",
            description: "High-quality outputs in seconds.",
          },
          {
            icon: true,
            title: "Flexible Models",
            description: "Choose from open-source or commercial providers.",
          },
          {
            icon: true,
            title: "Enterprise Ready",
            description: "Scalable, secure, and compliant.",
          },
        ],
      },
      {
        id: "accuracy-without-barriers",
        type: "grid",
        backgroundColor: "gray",
        title: "Accuracy Without Barriers",
        subtitle: "Reliable transcription for any product.",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Multi-Model Flexibility",
            description:
              "Switch between open-source humanoids like Whisper or commercial APIs for speed, scale, and performance.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Domain Adaptation",
            description:
              "Fine-tune models for healthcare, legal, media, or education to ensure industry-level accuracy.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Enterprise-Scale Output",
            description:
              "From single meetings to bulk transcription, DevX handles massive workloads with security, compliance, and efficiency.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "commercial-models",
        type: "grid",
        backgroundColor: "white",
        title: "Commercial Speech-to-Text Models",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: "/images/models/deepseek.png",
            title: "Deepgram",
            description:
              "Commercial API for quick, reliable, and creative speech recognition—ideal for real-time applications, voice assistants, and call centers.",
          },
          {
            icon: "/images/models/meta.png",
            title: "AssemblyAI",
            description:
              "A leading commercial model for accurate, real-time transcription widely used by developers and enterprises.",
          },
          {
            icon: true,
            title: "Elevenlabs",
            description:
              "Elevenlabs is an enterprise-grade AI, built into Creative Cloud, delivering brand-safe, commercially usable speech processing with strong editing tools.",
          },
        ],
      },
      {
        id: "opensource-models",
        type: "grid",
        backgroundColor: "gray",
        title: "Open-Source Models",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Whisper (OpenAI)",
            description:
              "Multilingual, highly accurate ASR widely used in open-source projects.",
          },
          {
            icon: true,
            title: "Wav2Vec 2.0 (Meta AI)",
            description:
              "Powerful self-supervised ASR model designed for diverse datasets.",
          },
          {
            icon: true,
            title: "Coqui STT",
            description:
              "Community-driven speech-to-text, easy to deploy and fine-tune.",
          },
          {
            icon: true,
            title: "NeMo (NVIDIA)",
            description:
              "A toolkit for training and deploying speech models optimized for enterprise.",
          },
          {
            icon: true,
            title: "Kaldi",
            description:
              "Established open-source ASR toolkit, widely used in academia and industry.",
          },
          {
            icon: true,
            title: "ESPnet",
            description:
              "End-to-end open-source speech processing toolkit supporting ASR, TTS, and speech translation. Known for flexibility.",
          },
        ],
      },
      {
        id: "testimonial-2",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "As an edtech company, we needed transcripts for every lecture. With DevX AI's speech recognition, we automated our workflow, making education more accessible and cost-effective for students worldwide.",
        author: {
          name: "Rohit Mehta",
          title: "Founder, EduVerse Global",
          nameClassName: "font-semibold text-orange-600 text-xl mb-1",
          titleClassName: "text-sm text-slate-600",
          avatar: {
            src: "/images/client_2.png",
          },
        },
      },
      {
        id: "explore-devx",
        type: "component",
        component: "ExporeDevxToday",
      },
    ],
  },
  "text-to-speech": {
    sections: [
      {
        id: "hero",
        type: "hero",
        props: {
          title: "Transforming",
          subtitle: "Text into Speech",
          description:
            "Turn text into natural, expressive voices with DevX. Powered by the best commercial APIs and open-source TTS models, our solution makes apps, chatbots, and learning platforms more human and engaging. Flexible, scalable, and brand-ready.",
          buttons: [
            {
              text: "Get Started",
              variant: "outline",
              size: "lg",
            },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
            },
          ],
        },
      },
      {
        id: "trusted-by",
        type: "trusted-by",
        title: "Trusted by top engineering and machine learning teams",
        logos: [
          {
            src: "https://www.datocms-assets.com/104802/1758662941-logo-writer.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Writter",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663023-zed-industries.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "zed_industry",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740008335-664287c9ef936d8ce43517f8_abridge-logo-wordmark-black.webp?auto=compress%2Cformat&fit=clip&h=50",
            alt: "abridge",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1752855457-clay-logo-dark-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "clay",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663169-sourcegraph_logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "sourcegraph",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663041-superhuman_id2iogfm7h_1-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "superhuman",
            className: "h-2 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740157858-bland-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Bland AI logo",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662897-logo-descript.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "descript",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663073-ambience-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "ambience",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662918-retool.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "retool",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1747248934-gamma-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "gamma",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1742563823-quora.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "quora",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758136309-openevidence-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "openevidence",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662984-logo-picnic.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "picnic",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663002-hex.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "hex",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1724272610-wispr.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "wispr",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663105-canopy.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "canopy",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662959-logo-patreon.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "patreon",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663144-cisco.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "cisco",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663176-logo-rime.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "rime",
            className: "h-4 w-auto",
          },
        ],
      },
      {
        id: "testimonial-1",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "DevX made it simple to add lifelike voices to our product. Setup was fast and the quality is outstanding across languages.",
        author: {
          name: "Laura Bennett",
          title: "Product Manager, BrightWave Learning",
          nameClassName: "font-semibold text-orange-600 text-xl mb-1",
          titleClassName: "text-sm text-slate-600",
          avatar: {
            src: "/images/client_1.png",
          },
        },
      },
      {
        id: "ai-powered-speech",
        type: "grid",
        backgroundColor: "white",
        tag: "Text to Speech",
        title: "AI-Powered Speech, Without Limits",
        description:
          "Harness the power of cutting edge text to speech models to deliver natural, expressive voices across any application. Whether you're scaling customer support, producing multilingual content, or building immersive experiences, DevX ensures speed, flexibility, and unmatched audio quality without boundaries.",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Instant Voice Generation",
            description:
              "Produce high-quality speech in seconds for IVR, chatbots, and media.",
          },
          {
            icon: true,
            title: "Flexible Voices",
            description:
              "Mix multilingual open-source voices with premium commercial APIs to match tone, style, and budget.",
          },
          {
            icon: true,
            title: "Enterprise Ready",
            description:
              "Global scale, caching, usage controls, and compliance built-in.",
          },
        ],
      },
      {
        id: "accuracy-without-barriers",
        type: "grid",
        backgroundColor: "gray",
        title: "Accuracy Without Barriers",
        subtitle: "Reliable transcription for any product.",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Multi-Model Flexibility",
            description:
              "Switch between open-source humanoids like Whisper or commercial APIs for speed, scale, and performance.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Custom Voice Branding",
            description:
              "Fine-tune models for healthcare, legal, media, or education to ensure industry-level accuracy.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Scalable Output",
            description:
              "From single meetings to bulk transcription, DevX handles massive workloads with security, compliance, and efficiency.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "commercial-models",
        type: "grid",
        backgroundColor: "white",
        title: "Commercial Models",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: "/images/models/deepseek.png",
            title: "ElevenLabs",
            description:
              "Ultra-realistic voices, cloning, and instant voice design with robust API.",
          },
          {
            icon: "/images/models/meta.png",
            title: "OpenAI TTS",
            description:
              "Fast, expressive voices with easy integration across the OpenAI stack.",
          },
          {
            icon: true,
            title: "Google Cloud TTS",
            description:
              "Enterprise voices in 100+ languages with advanced SSML and fine controls.",
          },
        ],
      },
      {
        id: "opensource-models",
        type: "grid",
        backgroundColor: "gray",
        title: "Open-Source Models",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Coqui TTS",
            description:
              "Community-driven text-to-speech with multilingual support and easy deployment.",
          },
          {
            icon: true,
            title: "Bark (Suno AI)",
            description:
              "Highly realistic, multilingual text-to-audio model with emotional expression.",
          },
          {
            icon: true,
            title: "Mozilla TTS",
            description:
              "Open-source neural TTS toolkit with high-quality voices and easy customization.",
          },
          {
            icon: true,
            title: "ESPnet-TTS",
            description:
              "End-to-end text-to-speech toolkit supporting multiple languages and voice cloning.",
          },
          {
            icon: true,
            title: "Piper (Rhasspy)",
            description:
              "Fast, local text-to-speech with low latency and privacy-focused design.",
          },
          {
            icon: true,
            title: "OpenTTS",
            description:
              "Multi-lingual text-to-speech system with support for multiple engines and voices.",
          },
        ],
      },
      {
        id: "business-use-cases",
        type: "grid",
        backgroundColor: "white",
        title: "Business Use Cases",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Education & Training",
            description:
              "Create engaging learning content with natural voices for courses, tutorials, and accessibility features.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Customer Support",
            description:
              "Enhance IVR systems, chatbots, and support automation with human-like voice responses.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Content & Media",
            description:
              "Produce audiobooks, podcasts, and multimedia content with consistent, high-quality voice generation.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "testimonial-2",
        type: "testimonial",
        backgroundColor: "white",
        quote:
          "Our support automation finally sounds human. DevX let us tune voices to our brand while keeping costs predictable.",
        author: {
          name: "Michael Carter",
          title: "CTO, Vaxify Technologies",
          nameClassName: "font-semibold text-orange-600 text-xl mb-1",
          titleClassName: "text-sm text-slate-600",
          avatar: {
            src: "/images/client_2.png",
          },
        },
      },
      {
        id: "explore-devx",
        type: "component",
        component: "ExporeDevxToday",
      },
    ],
  },
  embedding: {
    sections: [
      {
        id: "hero",
        type: "hero",
        props: {
          title: "Embeddings Built for",
          subtitle: "Infinite Scale",
          description:
            "Dev-Xi provides state-of-the-art embeddings with both open-source and commercial models—delivering speed, accuracy, and compliance for search, recommendation, and semantic understanding.",
          buttons: [
            {
              text: "Get Started",
              variant: "outline",
              size: "lg",
            },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
            },
          ],
        },
      },
      {
        id: "trusted-by",
        type: "trusted-by",
        title: "Trusted by top engineering and machine learning teams",
        logos: [
          {
            src: "https://www.datocms-assets.com/104802/1758662941-logo-writer.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Writter",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663023-zed-industries.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "zed_industry",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740008335-664287c9ef936d8ce43517f8_abridge-logo-wordmark-black.webp?auto=compress%2Cformat&fit=clip&h=50",
            alt: "abridge",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1752855457-clay-logo-dark-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "clay",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663169-sourcegraph_logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "sourcegraph",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663041-superhuman_id2iogfm7h_1-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "superhuman",
            className: "h-2 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740157858-bland-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Bland AI logo",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662897-logo-descript.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "descript",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663073-ambience-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "ambience",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662918-retool.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "retool",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1747248934-gamma-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "gamma",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1742563823-quora.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "quora",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758136309-openevidence-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "openevidence",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662984-logo-picnic.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "picnic",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663002-hex.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "hex",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1724272610-wispr.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "wispr",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663105-canopy.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "canopy",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662959-logo-patreon.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "patreon",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663144-cisco.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "cisco",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663176-logo-rime.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "rime",
            className: "h-4 w-auto",
          },
        ],
      },
      {
        id: "testimonial-1",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "We integrated Dev-Xi embeddings into our platform, and search accuracy improved dramatically. The scalability is unmatched",
        author: {
          name: "Sarah Collins",
          title: "CTO, Vectorflow Systems",
          nameClassName: "font-semibold text-orange-600 text-xl mb-1",
          titleClassName: "text-sm text-slate-600",
          avatar: {
            src: "/images/client_1.png",
          },
        },
      },
      {
        id: "meaning-that-matters",
        type: "grid",
        backgroundColor: "white",
        title: "Meaning That Matters",
        subtitle: "Reliable embeddings for any product.",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Universal Understanding",
            description:
              "Captures semantic meaning across languages, domains, and industries with precision.",
          },
          {
            icon: true,
            title: "Scalable Intelligence",
            description:
              "Power semantic search, clustering, and personalization at enterprise scale.",
          },
          {
            icon: true,
            title: "Context-Aware Matching",
            description:
              "Go beyond keywords with embeddings that understand nuance, intent, and context.",
          },
        ],
      },
      {
        id: "accuracy-without-barriers",
        type: "grid",
        backgroundColor: "gray",
        title: "Accuracy Without Barriers",
        subtitle: "Reliable embeddings for any product.",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Multi-Model Flexibility",
            description:
              "Combine commercial (OpenAI, Cohere, Anthropic) with open-source embeddings for the best cost/performance balance.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Domain Adaptation",
            description:
              "Fine-tune embeddings on your own data to capture domain-specific meaning and improve retrieval.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Scalable Output",
            description:
              "Generate billions of vector representations reliably with high throughput and enterprise-grade infrastructure.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "commercial-models",
        type: "grid",
        backgroundColor: "white",
        title: "Commercial Models",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: "/images/models/deepseek.png",
            title: "OpenAI Embeddings",
            description:
              "High-performance commercial embeddings optimized for semantic search and ranking, widely adopted in enterprise applications.",
          },
          {
            icon: "/images/models/meta.png",
            title: "Cohere Embed",
            description:
              "Versatile embeddings designed for classification, clustering, and retrieval—ideal for multilingual and large-scale deployments.",
          },
          {
            icon: true,
            title: "Google Vertex AI Embeddings",
            description:
              "Enterprise-ready embeddings for search and personalization with deep integration into Google's cloud ecosystem.",
          },
        ],
      },
      {
        id: "opensource-models",
        type: "grid",
        backgroundColor: "gray",
        title: "Open-Source Models",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "BGE-M3",
            description:
              "State-of-the-art multilingual embedding model supporting search and retrieval tasks.",
          },
          {
            icon: true,
            title: "Instructor XL",
            description:
              "Instruction-tuned embeddings that align with downstream tasks for more accurate retrieval.",
          },
          {
            icon: true,
            title: "E5 Models",
            description:
              "Lightweight, efficient embeddings optimized for sentence similarity and semantic search.",
          },
          {
            icon: true,
            title: "Sentence-BERT",
            description:
              "Proven embedding model for semantic similarity, clustering, and classification.",
          },
          {
            icon: true,
            title: "GTE (General Text Embeddings)",
            description:
              "Optimized for multilingual tasks, search, and cross-lingual understanding.",
          },
          {
            icon: true,
            title: "MiniLM",
            description:
              "Compact embedding model that balances speed and performance for edge and real-time use.",
          },
        ],
      },
      {
        id: "business-use-cases",
        type: "grid",
        backgroundColor: "white",
        title: "Business Use Cases",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Semantic Search",
            description:
              "Deliver fast, accurate results with context-aware embeddings that go beyond keywords.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Recommendations",
            description:
              "Personalize content, products, or learning experiences using embedding-powered similarity.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Knowledge Discovery",
            description:
              "Unlock insights from documents, research, and unstructured data with embedding-powered retrieval.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "testimonial-2",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "Embedding models from Dev-Xi transformed how we recommend products. Customers find what they need faster, with better satisfaction scores.",
        author: {
          name: "David Mitchell",
          title: "Head of AI, Insightly AI",
          nameClassName: "font-semibold text-orange-600 text-xl mb-1",
          titleClassName: "text-sm text-slate-600",
          avatar: {
            src: "/images/client_2.png",
          },
        },
      },
      {
        id: "explore-devx",
        type: "component",
        component: "ExporeDevxToday",
      },
    ],
  },
  "process-automation": {
    sections: [
      {
        id: "hero",
        type: "hero",
        props: {
          title: "Seamless workflows",
          subtitle: "powered by AI",
          description:
            "DevX AI helps businesses eliminate repetitive tasks and streamline operations with state-of-the-art process automation models. By combining commercial APIs with open-source frameworks, we deliver flexible, scalable, and cost-efficient automation at enterprise scale.",
          buttons: [
            {
              text: "Get Started",
              variant: "outline",
              size: "lg",
            },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
            },
          ],
        },
      },
      {
        id: "trusted-by",
        type: "trusted-by",
        title: "Trusted by top engineering and machine learning teams",
        logos: [
          {
            src: "https://www.datocms-assets.com/104802/1758662941-logo-writer.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Writter",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663023-zed-industries.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "zed_industry",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740008335-664287c9ef936d8ce43517f8_abridge-logo-wordmark-black.webp?auto=compress%2Cformat&fit=clip&h=50",
            alt: "abridge",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1752855457-clay-logo-dark-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "clay",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663169-sourcegraph_logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "sourcegraph",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663041-superhuman_id2iogfm7h_1-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "superhuman",
            className: "h-2 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740157858-bland-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Bland AI logo",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662897-logo-descript.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "descript",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663073-ambience-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "ambience",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662918-retool.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "retool",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1747248934-gamma-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "gamma",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1742563823-quora.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "quora",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758136309-openevidence-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "openevidence",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662984-logo-picnic.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "picnic",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663002-hex.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "hex",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1724272610-wispr.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "wispr",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663105-canopy.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "canopy",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662959-logo-patreon.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "patreon",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663144-cisco.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "cisco",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663176-logo-rime.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "rime",
            className: "h-4 w-auto",
          },
        ],
      },
      {
        id: "testimonial-1",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "DevX AI reduced our manual workload by 60%. The automation pipelines helped our ops team save hours daily.",
        author: {
          name: "James Carter",
          title: "COO, FlowLogic Systems",
          nameClassName: "font-semibold text-orange-600 text-xl mb-1",
          titleClassName: "text-sm text-slate-600",
          avatar: {
            src: "/images/client_1.png",
          },
        },
      },
      {
        id: "ai-powered-automation",
        type: "grid",
        backgroundColor: "white",
        tag: "Process Automation",
        title: "AI-Powered Process Automation, Without Limits",
        description:
          "DevX AI enables end-to-end process automation across industries—empowered by the best commercial and open-source models.",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Instant Efficiency",
            description:
              "Quickly automate routine tasks and reduce manual effort.",
          },
          {
            icon: true,
            title: "Flexible Models",
            description:
              "Choose from open-source or commercial providers to match your workflow.",
          },
          {
            icon: true,
            title: "Enterprise Ready",
            description:
              "Secure, scalable, and compliant automation infrastructure.",
          },
        ],
      },
      {
        id: "accuracy-without-barriers",
        type: "grid",
        backgroundColor: "gray",
        title: "Accuracy Without Barriers",
        subtitle: "Reliable automation for any product.",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Multi-Model Flexibility",
            description:
              "Integrate multiple providers (UiPath, Automation Anywhere, Zapier AI, Open-source RPA) to balance cost and performance.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Custom Workflow Design",
            description:
              "AI-driven process discovery and optimization to identify automation opportunities and improve efficiency.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Scalable Output",
            description:
              "Automate thousands of processes per second across enterprise-level systems.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "commercial-models",
        type: "grid",
        backgroundColor: "white",
        title: "Commercial Process Automation Models",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: "/images/models/deepseek.png",
            title: "UiPath",
            description:
              "Enterprise-grade RPA platform with AI integration for workflow automation.",
          },
          {
            icon: "/images/models/meta.png",
            title: "Automation Anywhere",
            description:
              "Cloud-native RPA with scalable automation and governance features.",
          },
          {
            icon: true,
            title: "Microsoft Power Automate",
            description:
              "Low-code automation platform integrated with the Microsoft ecosystem.",
          },
        ],
      },
      {
        id: "opensource-models",
        type: "grid",
        backgroundColor: "gray",
        title: "Open-Source Process Automation Models",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Robocorp",
            description:
              "Python-based open-source RPA framework with strong developer tooling.",
          },
          {
            icon: true,
            title: "TagUI",
            description:
              "Lightweight open-source RPA tool for quick automation scripts.",
          },
          {
            icon: true,
            title: "Apache Airflow",
            description:
              "Workflow orchestration platform widely used for data and process pipelines.",
          },
          {
            icon: true,
            title: "Camunda",
            description:
              "Open-source BPMN-based process automation engine for enterprises.",
          },
          {
            icon: true,
            title: "N8n",
            description:
              "Fair-code automation platform supporting 200+ integrations.",
          },
          {
            icon: true,
            title: "Haginn",
            description:
              "Open-source system for building agents that automate online tasks.",
          },
        ],
      },
      {
        id: "business-use-cases",
        type: "grid",
        backgroundColor: "white",
        title: "Business Use Cases",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Finance & Operations",
            description:
              "Automate invoice processing, reporting, and compliance.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Customer Service",
            description:
              "Streamline ticketing, chat responses, and support workflows.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "IT & DevOps",
            description:
              "Automate deployments, monitoring, and incident response.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "testimonial-2",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "We integrated DevX AI with our CRM and instantly eliminated repetitive tasks. Scalability and security are top-notch.",
        author: {
          name: "Emily Davis",
          title: "VP Operations, CorePath Technologies",
          nameClassName: "font-semibold text-orange-600 text-xl mb-1",
          titleClassName: "text-sm text-slate-600",
          avatar: {
            src: "/images/client_2.png",
          },
        },
      },
      {
        id: "explore-devx",
        type: "component",
        component: "ExporeDevxToday",
      },
    ],
  },
  "ai-agent": {
    sections: [
      {
        id: "hero",
        type: "hero",
        props: {
          title: "Intelligent assistants",
          subtitle: "built for your business",
          description:
            "DevX AI enables enterprises to deploy powerful AI Agents that automate workflows, interact with customers, and make decisions. By combining commercial APIs with open-source frameworks, our AI agents deliver autonomy, reliability, and flexibility across industries.",
          buttons: [
            { text: "Get Started", variant: "outline", size: "lg" },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
            },
          ],
        },
      },
      {
        id: "trusted-by",
        type: "trusted-by",
        title: "Trusted by top engineering and machine learning teams",
        logos: [
          {
            src: "https://www.datocms-assets.com/104802/1758662941-logo-writer.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Writter",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663023-zed-industries.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "zed_industry",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740008335-664287c9ef936d8ce43517f8_abridge-logo-wordmark-black.webp?auto=compress%2Cformat&fit=clip&h=50",
            alt: "abridge",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1752855457-clay-logo-dark-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "clay",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663169-sourcegraph_logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "sourcegraph",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663041-superhuman_id2iogfm7h_1-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "superhuman",
            className: "h-2 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740157858-bland-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Bland AI logo",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662897-logo-descript.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "descript",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663073-ambience-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "ambience",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662918-retool.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "retool",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1747248934-gamma-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "gamma",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1742563823-quora.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "quora",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758136309-openevidence-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "openevidence",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662984-logo-picnic.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "picnic",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663002-hex.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "hex",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1724272610-wispr.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "wispr",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663105-canopy.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "canopy",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662959-logo-patreon.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "patreon",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663144-cisco.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "cisco",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663176-logo-rime.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "rime",
            className: "h-4 w-auto",
          },
        ],
      },
      {
        id: "testimonial-1",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "With DevX AI Agents, we reduced customer response time by 70%. Our support is now faster and more consistent.",
        author: {
          name: "Michael Thompson",
          title: "Head of Support, Vortex Solutions",
          nameClassName: "font-semibold text-orange-600 text-xl mb-1",
          titleClassName: "text-sm text-slate-600",
          avatar: { src: "/images/client_1.png" },
        },
      },
      {
        id: "ai-powered-agents",
        type: "grid",
        backgroundColor: "white",
        tag: "AI Agents",
        title: "AI-Powered Agents, Without Limits",
        description:
          "DevX AI empowers organizations to build and scale production-grade AI agents—backed by the best commercial and open-source models.",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Autonomous Workflows",
            description:
              "Automate complex, multi-step tasks with reliable agent orchestration.",
          },
          {
            icon: true,
            title: "Flexible Models",
            description:
              "Choose from the best open-source or commercial providers.",
          },
          {
            icon: true,
            title: "Enterprise Ready",
            description:
              "Secure, auditable, and compliant agents with centralized controls.",
          },
        ],
      },
      {
        id: "accuracy-without-barriers",
        type: "grid",
        backgroundColor: "gray",
        title: "Accuracy Without Barriers",
        subtitle: "Reliable automation for any product.",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Multi-Model Flexibility",
            description:
              "Integrate multiple providers (OpenAI, Anthropic, Google, Open-source) to balance cost and performance.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Customizable Skills",
            description:
              "Compose task-specific tools, memory, and retrieval to match your workflows.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Scalable Output",
            description:
              "Run thousands of tasks per second across enterprise systems reliably and securely.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "commercial-models",
        type: "grid",
        backgroundColor: "white",
        title: "Commercial AI Agent Platforms",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: "/images/models/deepseek.png",
            title: "OpenAI GPT Agents",
            description:
              "Commercial agentic capabilities with tasks, tools, and function calling.",
          },
          {
            icon: "/images/models/meta.png",
            title: "Anthropic Claude AI Agent",
            description:
              "Safe, aligned, and compositional agent system with tool use.",
          },
          {
            icon: true,
            title: "Microsoft Copilot",
            description:
              "AI-assisted automations embedded into Microsoft 365 workflows.",
          },
        ],
      },
      {
        id: "opensource-models",
        type: "grid",
        backgroundColor: "gray",
        title: "Open-Source AI Agent Frameworks",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "LangChain",
            description:
              "Framework for building agent applications with tools and memory.",
          },
          {
            icon: true,
            title: "AutoGPT",
            description:
              "Experimental open-source agent for autonomous task execution.",
          },
          {
            icon: true,
            title: "CrewAI",
            description:
              "Multi-agent coordination framework for complex missions.",
          },
          {
            icon: true,
            title: "Haystack Agents",
            description:
              "Open-source RAG + agents framework for search and support.",
          },
          {
            icon: true,
            title: "SuperAGI",
            description:
              "Production-ready open-source AI agent framework at scale.",
          },
          {
            icon: true,
            title: "Semantic Kernel (Microsoft)",
            description:
              "Plugin-based framework for planning, agents, and tool use.",
          },
        ],
      },
      {
        id: "business-use-cases",
        type: "grid",
        backgroundColor: "white",
        title: "Business Use Cases",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Customer Support",
            description:
              "AI agents handling tickets, chats, and realtime support.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Sales & Marketing",
            description: "Prospecting, outreach, and pipeline automation.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Research & Operations",
            description:
              "Data analysis, workflow automation, and incident triage.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "testimonial-2",
        type: "testimonial",
        backgroundColor: "white",
        quote:
          "The flexibility of open-source and commercial agents gave us the best of both worlds. We scaled operations without extra headcount.",
        author: {
          name: "Olivia Bennett",
          title: "Director of Innovation, Accordance Labs",
          nameClassName: "font-semibold text-orange-600 text-xl mb-1",
          titleClassName: "text-sm text-slate-600",
          avatar: { src: "/images/client_2.png" },
        },
      },
      { id: "explore-devx", type: "component", component: "ExporeDevxToday" },
    ],
  },
  "agentic-ai": {
    sections: [
      {
        id: "hero",
        type: "hero",
        props: {
          title: "Agentic AI & AI Agents",
          subtitle: "Future Workflows",
          description:
            "Go beyond single tasks. With DevX Agentic AI, your business can deploy autonomous, multi-step agents for research, analytics, customer support, and process automation.",
          buttons: [
            { text: "Get Started", variant: "outline", size: "lg" },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
            },
          ],
        },
      },
      {
        id: "trusted-by",
        type: "trusted-by",
        title: "Trusted by top engineering and machine learning teams",
        logos: [
          {
            src: "https://www.datocms-assets.com/104802/1758662941-logo-writer.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Writter",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663023-zed-industries.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "zed_industry",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740008335-664287c9ef936d8ce43517f8_abridge-logo-wordmark-black.webp?auto=compress%2Cformat&fit=clip&h=50",
            alt: "abridge",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1752855457-clay-logo-dark-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "clay",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663169-sourcegraph_logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "sourcegraph",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663041-superhuman_id2iogfm7h_1-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "superhuman",
            className: "h-2 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740157858-bland-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Bland AI logo",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662897-logo-descript.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "descript",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663073-ambience-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "ambience",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662918-retool.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "retool",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1747248934-gamma-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "gamma",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1742563823-quora.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "quora",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758136309-openevidence-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "openevidence",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662984-logo-picnic.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "picnic",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663002-hex.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "hex",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1724272610-wispr.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "wispr",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663105-canopy.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "canopy",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662959-logo-patreon.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "patreon",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663144-cisco.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "cisco",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663176-logo-rime.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "rime",
            className: "h-4 w-auto",
          },
        ],
      },
      {
        id: "testimonial-1",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "Agentic AI streamlined our research workflows and reduced manual reporting by 60%.",
        author: {
          name: "John Reynolds",
          title: "CTO, DataBridge Analytics",
          avatar: { src: "/images/client_1.png" },
        },
      },
      {
        id: "core-agents",
        type: "grid",
        backgroundColor: "white",
        tag: "Agentic AI",
        title: "Core AI Agents",
        description:
          "Specialized agents designed to handle diverse business needs. From research and operations to customer support and creativity, each agent is optimized to automate tasks, improve efficiency, and scale seamlessly across industries.",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Research Agents",
            description: "Collect, analyze & summarize data automatically.",
          },
          {
            icon: true,
            title: "Customer Support Agents",
            description: "Resolve 24/7 user queries with empathy & speed.",
          },
          {
            icon: true,
            title: "Workflow Agents",
            description: "Automate repetitive office tasks end-to-end.",
          },
          {
            icon: true,
            title: "Ops Agents",
            description: "Monitor, predict & optimize operations in real time.",
          },
          {
            icon: true,
            title: "Finance Agents",
            description: "Automate reporting, forecasting & compliance checks.",
          },
          {
            icon: true,
            title: "Creative Agents",
            description:
              "Generate new concepts, designs & multimedia with brand tone.",
          },
        ],
      },
      {
        id: "ai-powered-automation",
        type: "grid",
        backgroundColor: "gray",
        title: "AI-Powered Automation, Without Limits",
        description:
          "Unlock the next level of efficiency with autonomous AI agents that can manage workflows, streamline operations, and deliver results without constant supervision. From research and finance to customer service and creative tasks, our automation solutions adapt to your business needs—scalable, flexible, and reliable.",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Scalable Efficiency",
            description:
              "Reduce manual effort, increase output, and lower costs.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Multi-Agent Collaboration",
            description:
              "Coordinate autonomous agents to solve complex workflows.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Enterprise Security",
            description:
              "Fine-grained permissions, audit trails, and compliance.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "commercial-models",
        type: "grid",
        backgroundColor: "white",
        title: "Commercial Agent Frameworks",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: "/images/models/meta.png",
            title: "Microsoft Copilot Studio",
            description: "Customizable enterprise design of agentic copilots.",
          },
          {
            icon: "/images/models/deepseek.png",
            title: "OpenAI Assistants API",
            description: "Flexible assistant runtime with memory & tools.",
          },
          {
            icon: true,
            title: "Cognigy.AI",
            description:
              "Contact center automations and enterprise orchestration.",
          },
        ],
      },
      {
        id: "opensource-models",
        type: "grid",
        backgroundColor: "gray",
        title: "Open-Source Agent Frameworks",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "LangChain Agents",
            description: "Tool-first building, awareness reasoning agents.",
          },
          {
            icon: true,
            title: "AutoGPT",
            description: "Open-source experimental autonomous AI.",
          },
          {
            icon: true,
            title: "CrewAI",
            description: "Multi-agent collaboration system.",
          },
          {
            icon: true,
            title: "Haystack Agents",
            description: "Open-source search/Q&A automations.",
          },
          {
            icon: true,
            title: "CAMEL AI",
            description: "Role-playing multi-agent collaboration framework.",
          },
          {
            icon: true,
            title: "SuperAGI",
            description: "Open-source framework for scaling autonomous agents.",
          },
        ],
      },
      {
        id: "business-use-cases",
        type: "grid",
        backgroundColor: "white",
        title: "Business Use Cases",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Healthcare",
            description:
              "AI agents triage patient queries & summarize reports.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Finance",
            description: "Agents manage compliance checks & fraud detection.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Ecommerce",
            description:
              "AI-driven product recommendations & support chatbots.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "testimonial-2",
        type: "testimonial",
        backgroundColor: "white",
        quote:
          "With AI agents, our support team can now focus on high‑value tasks while routine queries are resolved automatically.",
        author: {
          name: "Emma Collins",
          title: "VP of Customer Success at NeuroTech",
          avatar: { src: "/images/client_2.png" },
        },
      },
      { id: "explore-devx", type: "component", component: "ExporeDevxToday" },
    ],
  },
  "text-to-song": {
    sections: [
      {
        id: "hero",
        type: "hero",
        props: {
          title: "Transforming Words",
          subtitle: "into Music",
          description:
            "Bring your ideas to life with AI‑powered music generation. With DevX AI, you can instantly turn lyrics or prompts into full songs—complete with vocals, instruments, and styles. Whether for creators, advertising, or immersive experiences, our Text‑to‑Song solution makes professional‑quality music accessible, scalable, and customizable.",
          buttons: [
            { text: "Get Started", variant: "outline", size: "lg" },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
            },
          ],
        },
      },
      {
        id: "trusted-by",
        type: "trusted-by",
        title: "Trusted by top engineering and machine learning teams",
        logos: [
          {
            src: "https://www.datocms-assets.com/104802/1758662941-logo-writer.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Writter",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663023-zed-industries.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "zed_industry",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740008335-664287c9ef936d8ce43517f8_abridge-logo-wordmark-black.webp?auto=compress%2Cformat&fit=clip&h=50",
            alt: "abridge",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1752855457-clay-logo-dark-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "clay",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663169-sourcegraph_logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "sourcegraph",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663041-superhuman_id2iogfm7h_1-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "superhuman",
            className: "h-2 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740157858-bland-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Bland AI logo",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662897-logo-descript.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "descript",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663073-ambience-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "ambience",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662918-retool.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "retool",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1747248934-gamma-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "gamma",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1742563823-quora.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "quora",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758136309-openevidence-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "openevidence",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662984-logo-picnic.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "picnic",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663002-hex.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "hex",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1724272610-wispr.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "wispr",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663105-canopy.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "canopy",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662959-logo-patreon.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "patreon",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663144-cisco.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "cisco",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663176-logo-rime.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "rime",
            className: "h-4 w-auto",
          },
        ],
      },
      {
        id: "testimonial-1",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "DevX AI gave our brand campaigns a new dimension. Within hours, we generated original songs that matched our storytelling perfectly—saving both time and cost.",
        author: {
          name: "Emily Carter",
          title: "Creative Director, SoundWave Media",
          avatar: { src: "/images/client_1.png" },
        },
      },
      {
        id: "ai-powered-text-to-song",
        type: "grid",
        backgroundColor: "white",
        tag: "Text to Song",
        title: "AI‑Powered Text‑to‑Song, Without Limits",
        description:
          "Turn any idea into music with the power of generative AI. Platforms like Suno and MusicGen have proven that anyone can compose full tracks—complete with vocals, instruments, and styles—in just minutes. With DevX AI, you get the same cutting‑edge technology tailored for businesses: scalable, flexible, and customizable for creative, educational, and commercial needs without barriers.",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Instant Composition",
            description: "Generate full songs in minutes, not months.",
          },
          {
            icon: true,
            title: "Flexible Models",
            description:
              "Choose between commercial APIs and open‑source frameworks.",
          },
          {
            icon: true,
            title: "Enterprise Ready",
            description:
              "Scalable, secure, and cost‑efficient for any production.",
          },
        ],
      },
      {
        id: "creativity-without-limits",
        type: "grid",
        backgroundColor: "gray",
        title: "Creativity Without Limits",
        description:
          "From catchy jingles to full‑length tracks, AI‑powered text‑to‑song tools unlock endless creative possibilities. Generate music in any genre, language, or mood—whether for ads, content creators, education, or entertainment. With customizable vocals, instruments, and lyrics, DevX AI empowers anyone to compose professional‑quality music at scale.",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Custom Vocal Styles",
            description:
              "Select voice tone, gender, and mood for unique vocals.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Genre Versatility",
            description:
              "From pop and hip‑hop to cinematic scores and sound design.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Brand‑Ready Soundtracks",
            description: "Perfect for ads, games, and immersive experiences.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "commercial-models",
        type: "grid",
        backgroundColor: "white",
        title: "Commercial Text‑to‑Song Models",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: "/images/models/deepseek.png",
            title: "Suno AI",
            description:
              "Commercial leader in generative music with vocals and instruments.",
          },
          {
            icon: "/images/models/meta.png",
            title: "Mubert",
            description:
              "AI music generator for realtime stock audio creation.",
          },
          {
            icon: true,
            title: "Aiva",
            description:
              "AI composer for film, games, and creative industries.",
          },
        ],
      },
      {
        id: "opensource-models",
        type: "grid",
        backgroundColor: "gray",
        title: "Open‑Source Text‑to‑Song Models",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Riffusion",
            description:
              "Open‑source model generating music via spectrogram diffusion.",
          },
          {
            icon: true,
            title: "MusicGen (Meta)",
            description:
              "High‑quality text‑to‑music model supporting multiple genres.",
          },
          {
            icon: true,
            title: "Jukebox (OpenAI)",
            description:
              "Powerful research model for long‑form music generation.",
          },
          {
            icon: true,
            title: "Magenta (Google)",
            description: "Framework for creative AI in music and art.",
          },
          {
            icon: true,
            title: "Dance Diffusion (Harmonai)",
            description: "Open‑source project for generative music training.",
          },
          {
            icon: true,
            title: "DiffSinger",
            description: "Open‑source singing voice synthesis model.",
          },
        ],
      },
      {
        id: "business-use-cases",
        type: "grid",
        backgroundColor: "white",
        title: "Business Use Cases",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Advertising & Marketing",
            description: "Create ad jingles and branded songs on demand.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Gaming & Metaverse",
            description:
              "Generate adaptive background scores for levels and scenes.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
          {
            icon: true,
            title: "Education & Training",
            description: "Use AI‑generated music to make lessons engaging.",
            button: {
              text: "Talk with experts",
              variant: "outline",
              size: "sm",
            },
          },
        ],
      },
      {
        id: "testimonial-2",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "As an indie game studio, we needed adaptive music without hiring a full orchestra. With DevX AI’s Text‑to‑Song tools, we produced unique soundtracks that fit every gameplay moment.",
        author: {
          name: "Daniel Lewis",
          title: "Founder, PixelForge Games",
          avatar: { src: "/images/client_2.png" },
        },
      },
      { id: "explore-devx", type: "component", component: "ExporeDevxToday" },
    ],
  },
  "product-study-ai": {
    sections: [
      {
        id: "hero",
        type: "hero",
        props: {
          title: "Smarter Learning",
          subtitle: "and Teaching",
          description: "Transform how students learn with AI-driven tools.",
          buttons: [
            { text: "Get Started", variant: "outline", size: "lg" },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
            },
          ],
        },
      },
      {
        id: "trusted-by",
        type: "trusted-by",
        title: "Trusted by top engineering and machine learning teams",
        logos: [
          {
            src: "https://www.datocms-assets.com/104802/1758662941-logo-writer.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Writter",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663023-zed-industries.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "zed_industry",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740008335-664287c9ef936d8ce43517f8_abridge-logo-wordmark-black.webp?auto=compress%2Cformat&fit=clip&h=50",
            alt: "abridge",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1752855457-clay-logo-dark-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "clay",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663169-sourcegraph_logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "sourcegraph",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663041-superhuman_id2iogfm7h_1-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "superhuman",
            className: "h-2 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740157858-bland-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Bland AI logo",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662897-logo-descript.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "descript",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663073-ambience-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "ambience",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662918-retool.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "retool",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1747248934-gamma-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "gamma",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1742563823-quora.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "quora",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758136309-openevidence-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "openevidence",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662984-logo-picnic.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "picnic",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663002-hex.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "hex",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1724272610-wispr.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "wispr",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663105-canopy.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "canopy",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662959-logo-patreon.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "patreon",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663144-cisco.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "cisco",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663176-logo-rime.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "rime",
            className: "h-4 w-auto",
          },
        ],
      },
      {
        id: "testimonial-1",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "Study with AI has completely changed how my students learn and how I teach. I can prepare lessons faster, and students engage more with the material. It feels like having a co‑teacher that never gets tired.",
        author: {
          name: "Dr. Anjali Sharma",
          title: "High School Teacher",
          avatar: { src: "/images/client_1.png" },
        },
      },
      {
        id: "smarter-learning-teaching",
        type: "grid",
        backgroundColor: "white",
        title: "Smarter Learning, Smarter Teaching",
        description:
          "Study‑with‑AI bundles for schools and teachers. Smarter notes, interactive content, and faster teaching prep—all in one place.",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Interactive by Design",
            description:
              "AI‑generated activities keep students engaged and motivated.",
          },
          {
            icon: true,
            title: "Teacher Productivity Boost",
            description:
              "Create lesson plans, quizzes, summaries, and feedback instantly.",
          },
          {
            icon: true,
            title: "Trusted & Aligned",
            description:
              "Controls for academic integrity with curriculum‑aligned content.",
          },
        ],
      },
      {
        id: "study-with-ai-features",
        type: "grid",
        backgroundColor: "gray",
        title: "Study with AI – Features",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "AI Tutor",
            description: "Personalized Q&A, explanations, and practice.",
          },
          {
            icon: true,
            title: "Smart Notes & Summaries",
            description: "Auto summaries from lectures, textbooks, and audio.",
          },
          {
            icon: true,
            title: "Quiz & Test Generator",
            description:
              "Create quizzes, worksheets, rubrics, and exam papers.",
          },
          {
            icon: true,
            title: "AI Grading Assistant",
            description: "Faster feedback with rubric‑based evaluations.",
          },
          {
            icon: true,
            title: "Performance Insights",
            description: "Identify knowledge gaps with analytics and reports.",
          },
          {
            icon: true,
            title: "Multi‑style Learning",
            description:
              "Visual, audio, or text—students learn the way that suits them.",
          },
        ],
      },
      {
        id: "smarter-learning-1",
        type: "product-feature",
        backgroundColor: "white",
        title: "Smarter Learning, Smarter Teaching",
        description:
          "With Study‑with‑AI, learning becomes engaging, personalized, and measurable—empowering both students and teachers to focus on what matters: understanding and growth.",
        items: [
          {
            title: "How it helps Students",
            points: [
              "Understand complex topics with interactive, multi‑modal explanations.",
              "Explore topics in multiple teaching styles for better clarity.",
              "Get instant study notes, summaries, and practice questions.",
            ],
          },
          {
            title: "How it helps Teachers",
            points: [
              "Create question papers and assignments in minutes.",
              "Check and evaluate student work with AI-powered assessment.",
              "Discover new ways to teach each topic, keeping lessons engaging.",
            ],
          },
        ],
        image: "/images/product/product_study_1.png",
        imagePosition: "right",
      },
      {
        id: "smarter-learning-2",
        type: "product-feature",
        backgroundColor: "gray",
        title: "Smarter Learning, Smarter Teaching",
        description:
          "DevX Study with AI is a ready-to-use education product, trained on authentic libraries designed for all standards and schools. Built for both students and teachers, it transforms classrooms into interactive, personalized, and future-ready learning environments.",
        items: [
          {
            title: "For Students",
            points: [
              "Understand complex concepts with interactive, multi-style explanations.",
              "Get instant summaries, notes, and flashcards for revision.",
              "Practice with AI-generated quizzes and exercises tailored to their level.",
              "Learn at their own pace, with personalized AI tutoring support.",
            ],
          },
          {
            title: "For Teachers",
            points: [
              "Create question papers, practice sets, and assignments in minutes.",
              "Use AI-assisted paper checking to save time and ensure fairness.",
              "Access multiple teaching methods per topic, making lessons more engaging.",
              "Track student performance with AI-driven insights and reports.",
            ],
          },
          {
            title: "Key Benefits",
            points: [
              "Ready-trained libraries aligned with global education standards.",
              "Supports all major subjects across K-12 and higher education.",
              "Saves time and effort for teachers while boosting student outcomes.",
              "Makes learning interactive, accessible, and inclusive.",
            ],
          },
        ],
        image: "/images/product/product_study_2.png",
        imagePosition: "left",
      },
      { id: "explore-devx", type: "component", component: "ExporeDevxToday" },
    ],
  },
  "product-healthy-ai": {
    sections: [
      {
        id: "hero",
        type: "hero",
        props: {
          title: "Health AI",
          description:
            "DevX Health AI is a healthcare-ready solution designed to assist doctors, hospitals, and patients with AI-powered insights. From diagnosis support to patient engagement, it brings accuracy, efficiency, and personalization to modern healthcare—while ensuring compliance and security.",
          buttons: [
            { text: "Get Started", variant: "outline", size: "lg" },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
            },
          ],
        },
      },
      {
        id: "trusted-by",
        type: "trusted-by",
        title: "Trusted by top engineering and machine learning teams",
        logos: [
          {
            src: "https://www.datocms-assets.com/104802/1758662941-logo-writer.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Writter",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663023-zed-industries.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "zed_industry",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740008335-664287c9ef936d8ce43517f8_abridge-logo-wordmark-black.webp?auto=compress%2Cformat&fit=clip&h=50",
            alt: "abridge",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1752855457-clay-logo-dark-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "clay",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663169-sourcegraph_logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "sourcegraph",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663041-superhuman_id2iogfm7h_1-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "superhuman",
            className: "h-2 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740157858-bland-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Bland AI logo",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662897-logo-descript.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "descript",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663073-ambience-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "ambience",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662918-retool.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "retool",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1747248934-gamma-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "gamma",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1742563823-quora.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "quora",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758136309-openevidence-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "openevidence",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662984-logo-picnic.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "picnic",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663002-hex.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "hex",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1724272610-wispr.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "wispr",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663105-canopy.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "canopy",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662959-logo-patreon.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "patreon",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663144-cisco.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "cisco",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663176-logo-rime.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "rime",
            className: "h-4 w-auto",
          },
        ],
      },
      {
        id: "testimonial-1",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "Health AI helped us cut patient waiting times by 30% while improving diagnosis accuracy. Doctors can now focus more on care, and patients feel better supported every step of the way.",
        author: {
          name: "Dr. Michael Harris",
          title: "Director, CareWell Hospital",
          avatar: { src: "/images/client_1.png" },
        },
      },
      {
        id: "care-powered",
        type: "grid",
        backgroundColor: "white",
        title: "Smarter Care, Powered by AI",
        subtitle:
          "From clinical notes to patient support, DevX Health AI brings efficiency, accuracy, and intelligence to healthcare providers.",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Clinical Documentation",
            description:
              "AI-powered transcription and summarization of radiology, pathology, and clinical reports.",
          },
          {
            icon: true,
            title: "Patient Support",
            description:
              "24/7 AI assistants for answering patient queries, appointment scheduling, and follow-ups.",
          },
          {
            icon: true,
            title: "Research & Insights",
            description:
              "Analyze medical literature and patient records faster to support evidence-based care.",
          },
        ],
      },
      {
        id: "health-ai-features",
        type: "grid",
        backgroundColor: "gray",
        title: "Health AI — Features",
        subtitle:
          "DevX Health AI enhances patient care with accurate, secure, and time-saving medical AI solutions.",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "AI scribes",
            description:
              "Automate note-taking for doctors, clinics, and hospitals.",
          },
          {
            icon: true,
            title: "Diagnostic Summaries",
            description:
              "Summarize patient history, lab reports, and scans instantly.",
          },
          {
            icon: true,
            title: "Clinical Transcription",
            description:
              "Convert speech to structured medical notes with compliance.",
          },
          {
            icon: true,
            title: "Treatment Insights",
            description:
              "Surface relevant medical guidelines and case references.",
          },
          {
            icon: true,
            title: "Workflow Automation",
            description:
              "Reduce paperwork with automated documentation and reporting.",
          },
          {
            icon: true,
            title: "Patient Engagement",
            description:
              "Provide simplified explanations for better patient understanding.",
          },
        ],
      },
      {
        id: "care-outcomes",
        type: "product-feature",
        backgroundColor: "white",
        title: "Smarter Care, Smarter Outcomes",
        description:
          "DevX Health AI is a healthcare-ready solution designed to assist doctors, hospitals, and patients with AI-powered insights. From diagnosis support to patient engagement, it brings accuracy, efficiency, and personalization to modern healthcare—while ensuring compliance and security.",
        items: [
          {
            title: "How it helps Doctors",
            points: [
              "Automate medical note-taking with AI scribes during consultations.",
              "Instantly summarize lab reports, scans, and patient histories.",
              "Save hours of paperwork with automated documentation and compliance checks.",
            ],
          },
          {
            title: "How it helps Patients",
            points: [
              "Receive clear, simplified explanations of diagnoses and treatment plans.",
              "Get personalized reminders for medication, appointments, and follow-ups.",
              "Improve communication with doctors through AI-powered engagement tools.",
            ],
          },
        ],
        image: "/images/product/product_health_1.png",
        imagePosition: "right",
      },
      {
        id: "ai-for-health",
        type: "product-feature",
        backgroundColor: "gray",
        title: "AI for Health, Care for All",
        description:
          "DevX Health AI transforms healthcare delivery by empowering doctors, hospitals, and patients with intelligent, AI-driven support. From faster, more accurate diagnosis to personalized patient engagement, it enhances every stage of care. With built-in compliance and security, DevX Health AI ensures safer, more efficient, and patient-centered healthcare for the future.",
        items: [
          {
            title: "For Doctors & Hospitals",
            points: [
              "AI-assisted diagnosis with symptom and image analysis.",
              "Automated report generation (radiology, pathology, EHR notes).",
              "Predictive analytics for patient risk and treatment planning.",
              "Voice-to-text transcription for faster documentation.",
            ],
          },
          {
            title: "For Patients",
            points: [
              "24/7 AI-powered health assistant for queries and guidance.",
              "Personalized treatment reminders and medication tracking.",
              "Easy-to-understand summaries of medical reports.",
              "Virtual follow-ups with symptom monitoring.",
            ],
          },
          {
            title: "Key Benefits",
            points: [
              "Reduces workload for healthcare professionals.",
              "Improves accuracy and speeds up diagnosis.",
              "Enhances patient experience with personalized care.",
              "Secure and compliant with healthcare data standards (HIPAA, GDPR).",
            ],
          },
        ],
        image: "/images/product/product_health_2.png",
        imagePosition: "left",
      },
      { id: "explore-devx", type: "component", component: "ExporeDevxToday" },
    ],
  },
  "product-legal-ai": {
    sections: [
      {
        id: "hero",
        type: "hero",
        props: {
          title: "AI For Legal",
          description:
            "DevX Legal AI is a domain-ready solution designed for lawyers, firms, and legal researchers. From contract drafting to case analysis, it transforms legal practice with accuracy, speed, and AI-powered insights—while ensuring compliance and confidentiality.",
          buttons: [
            { text: "Get Started", variant: "outline", size: "lg" },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
            },
          ],
        },
      },
      {
        id: "trusted-by",
        type: "trusted-by",
        title: "Trusted by top engineering and machine learning teams",
        logos: [
          {
            src: "https://www.datocms-assets.com/104802/1758662941-logo-writer.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Writter",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663023-zed-industries.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "zed_industry",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740008335-664287c9ef936d8ce43517f8_abridge-logo-wordmark-black.webp?auto=compress%2Cformat&fit=clip&h=50",
            alt: "abridge",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1752855457-clay-logo-dark-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "clay",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663169-sourcegraph_logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "sourcegraph",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663041-superhuman_id2iogfm7h_1-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "superhuman",
            className: "h-2 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740157858-bland-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Bland AI logo",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662897-logo-descript.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "descript",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663073-ambience-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "ambience",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662918-retool.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "retool",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1747248934-gamma-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "gamma",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1742563823-quora.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "quora",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758136309-openevidence-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "openevidence",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662984-logo-picnic.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "picnic",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663002-hex.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "hex",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1724272610-wispr.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "wispr",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663105-canopy.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "canopy",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662959-logo-patreon.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "patreon",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663144-cisco.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "cisco",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663176-logo-rime.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "rime",
            className: "h-4 w-auto",
          },
        ],
      },
      {
        id: "testimonial-1",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "DevX Legal AI has cut our contract review time in half. Our lawyers can focus on strategy instead of paperwork.",
        author: {
          name: "James Walker",
          title: "Partner, Hamilton & Walker LLP",
          avatar: { src: "/images/client_1.png" },
        },
      },
      {
        id: "legal-powered",
        type: "grid",
        backgroundColor: "white",
        title: "AI-Powered Legal",
        subtitle:
          "DevX Legal AI empowers law firms, legal teams, and compliance officers with AI-driven document review, case summarization, and contract analysis. Designed to save time, reduce errors, and unlock insights—while ensuring security and confidentiality.",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Clinical Documentation",
            description:
              "Instantly analyze and flag risks, clauses, and obligations in complex contracts.",
          },
          {
            icon: true,
            title: "Case Summarization",
            description:
              "Reduce hundreds of pages of case law into actionable briefs.",
          },
          {
            icon: true,
            title: "Compliance Ready",
            description:
              "Built with enterprise-grade security and auditability for legal workflows.",
          },
        ],
      },
      {
        id: "legal-features",
        type: "grid",
        backgroundColor: "gray",
        title: "Legal AI — Features",
        subtitle:
          "DevX Legal AI modernizes legal practice with tools built for speed, accuracy, and compliance.",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Automated Case Summaries",
            description: "Automated case summaries from case law.",
          },
          {
            icon: true,
            title: "eDiscovery Acceleration",
            description: "Review thousands of documents with AI tagging.",
          },
          {
            icon: true,
            title: "Compliance Monitoring",
            description: "Ensure adherence to regulations and policies.",
          },
          {
            icon: true,
            title: "Legal Research Assistant",
            description: "Translate complex contracts into plain English.",
          },
          {
            icon: true,
            title: "Contract Analysis Assistant",
            description: "Extract clauses and obligations from contracts.",
          },
          {
            icon: true,
            title: "Risk Assessment",
            description: "Automatically identify risky terms and gaps.",
          },
        ],
      },
      {
        id: "legal-confidentiality",
        type: "product-feature",
        backgroundColor: "white",
        title: "Built for Legal Confidentiality",
        description:
          "End-to-end encryption, role-based access, and data residency controls ensure compliance with GDPR, HIPAA, and other regulatory standards.",
        items: [
          {
            title: "How it helps Law Firms",
            points: [
              "Reduce research and review timelines by 50%+.",
              "Lower operational costs while boosting accuracy.",
              "Focus lawyers’ time on strategy, not paperwork.",
            ],
          },
          {
            title: "How it helps Clients",
            points: [
              "Get quicker, clearer case updates.",
              "Receive plain-language summaries of legal jargon.",
              "Benefit from lower costs due to efficiency gains.",
            ],
          },
        ],
        image: "/images/product/product_law_1.png",
        imagePosition: "right",
      },
      {
        id: "smarter-law",
        type: "product-feature",
        backgroundColor: "gray",
        title: "Smarter Law, Faster Justice",
        description:
          "DevX Legal AI is a domain-ready solution designed for lawyers, firms, and legal researchers. From contract drafting to case analysis, it transforms legal practice with accuracy, speed, and AI-powered insights—while ensuring compliance and confidentiality.",
        items: [
          {
            title: "For Legal Professionals",
            points: [
              "Draft, review, and summarize contracts in minutes.",
              "Automate case law research with AI-driven insights.",
              "Generate client-friendly explanations of complex legal terms.",
              "Prepare litigation strategies with predictive case outcome analysis.",
            ],
          },
          {
            title: "For Law Firms & Clients",
            points: [
              "Reduce time spent on routine documentation.",
              "Provide clients with clear, AI-assisted answers to common legal queries.",
              "Maintain compliance with strict data privacy standards.",
              "Improve case efficiency with AI-assisted evidence review.",
            ],
          },
          {
            title: "Key Benefits",
            points: [
              "Save hours of manual legal research and documentation.",
              "Increase client satisfaction with clear, faster communication.",
              "Built-in compliance to handle sensitive legal data securely.",
              "Works across multiple legal domains (corporate, civil, IP, and more).",
            ],
          },
        ],
        image: "/images/product/product_law_2.png",
        imagePosition: "left",
      },
      { id: "explore-devx", type: "component", component: "ExporeDevxToday" },
    ],
  },
  "product-travel-ai": {
    sections: [
      {
        id: "hero",
        type: "hero",
        props: {
          title: "AI for Travel & Vloggers",
          description:
            "DevX Travel AI transforms travel vlogs and blogs into interactive chatbots that generate personalized itineraries. Vloggers can share their journeys as immersive AI experiences, and travelers get instant, curated trip plans—powered by real stories, not generic guides.",
          buttons: [
            { text: "Get Started", variant: "outline", size: "lg" },
            {
              text: "Talk to an Expert",
              variant: "default",
              size: "lg",
              className: "bg-orange-600 hover:bg-orange-700 text-white",
            },
          ],
        },
      },
      {
        id: "trusted-by",
        type: "trusted-by",
        title: "Trusted by top engineering and machine learning teams",
        logos: [
          {
            src: "https://www.datocms-assets.com/104802/1758662941-logo-writer.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Writter",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663023-zed-industries.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "zed_industry",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740008335-664287c9ef936d8ce43517f8_abridge-logo-wordmark-black.webp?auto=compress%2Cformat&fit=clip&h=50",
            alt: "abridge",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1752855457-clay-logo-dark-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "clay",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663169-sourcegraph_logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "sourcegraph",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663041-superhuman_id2iogfm7h_1-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "superhuman",
            className: "h-2 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1740157858-bland-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "Bland AI logo",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662897-logo-descript.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "descript",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663073-ambience-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "ambience",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662918-retool.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "retool",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1747248934-gamma-logo.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "gamma",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1742563823-quora.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "quora",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758136309-openevidence-1.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "openevidence",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662984-logo-picnic.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "picnic",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663002-hex.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "hex",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1724272610-wispr.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "wispr",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663105-canopy.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "canopy",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758662959-logo-patreon.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "patreon",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663144-cisco.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "cisco",
            className: "h-4 w-auto",
          },
          {
            src: "https://www.datocms-assets.com/104802/1758663176-logo-rime.png?auto=compress%2Cformat&fit=clip&h=50",
            alt: "rime",
            className: "h-4 w-auto",
          },
        ],
      },
      {
        id: "testimonial-1",
        type: "testimonial",
        backgroundColor: "gray",
        quote:
          "My audience loves the AI itinerary tool—it’s like chatting with me before they travel!",
        author: {
          name: "Emma Collins",
          title: "Travel Vlogger, WanderWithEmma",
          avatar: { src: "/images/client_2.png" },
        },
      },
      {
        id: "travel-powered",
        type: "grid",
        backgroundColor: "white",
        title: "AI-Powered Travel, Without Limits",
        subtitle:
          "From creator content to traveler support, DevX Travel AI brings efficiency, accuracy, and intelligence to travel experiences.",
        gridCols: "3",
        cardSize: "medium",
        items: [
          {
            icon: true,
            title: "Vlog-to-Chatbot",
            description:
              "Turn YouTube or blog content into interactive travel assistants.",
          },
          {
            icon: true,
            title: "Personalized Itineraries",
            description:
              "Generate day-by-day trip plans based on real traveler experiences.",
          },
          {
            icon: true,
            title: "Multi-Domain Expansion",
            description:
              "Extend the same AI to food, lifestyle, and culture creators.",
          },
        ],
      },
      {
        id: "travel-features",
        type: "grid",
        backgroundColor: "gray",
        title: "Travel AI — Features",
        subtitle:
          "DevX Travel AI enhances travel with accurate, secure, and time-saving creator AI solutions.",
        gridCols: "3",
        cardSize: "large",
        items: [
          {
            icon: true,
            title: "Itinerary Generator",
            description: "AI builds plans based on vloggers’ travel paths",
          },
          {
            icon: true,
            title: "Food & Culture Guides",
            description:
              "Extend to food vloggers, lifestyle, and local experts.",
          },
          {
            icon: true,
            title: "Chatbot Companion",
            description:
              "Travelers ask questions and get answers from vlog data.",
          },
          {
            icon: true,
            title: "Content Repurposing",
            description:
              "Blogs & videos auto-summarized into structured travel guides.",
          },
          {
            icon: true,
            title: "Multi-Language Support",
            description:
              "Guides available in local languages for wider audiences.",
          },
          {
            icon: true,
            title: "Vlogger Branding",
            description:
              "Keep each AI assistant creator-branded to retain identity.",
          },
        ],
      },
      {
        id: "travel-benefits-1",
        type: "product-feature",
        backgroundColor: "white",
        title: "Built for Creators and Travelers",
        description:
          "Empowering vloggers to turn years of travel experience into scalable, interactive products that reach millions of travelers.",
        items: [
          {
            title: "How it helps Vloggers",
            points: [
              "Vlogs → Interactive AI Guides",
              "Monetize content with AI-powered guides.",
              "Offer fans a more engaging, interactive experience.",
              "Repurpose old content into evergreen travel assistants.",
            ],
          },
          {
            title: "How it helps Travelers",
            points: [
              "Save hours of scrolling through vlogs before trips.",
              "Get tailored itineraries based on trusted creators.",
              "Access real insights from on-the-ground experiences.",
            ],
          },
        ],
        image: "/images/product/product_travel_1.png",
        imagePosition: "right",
      },
      {
        id: "travel-benefits-2",
        type: "product-feature",
        backgroundColor: "gray",
        title: "Smarter Journeys, Inspired by Experience",
        description:
          "DevX Travel AI transforms how travelers plan trips by combining the creativity of vloggers with AI personalization. Travelers can interact with vlog-inspired chatbots that create custom itineraries based on real-world travel experiences.",
        items: [
          {
            title: "For Vloggers & Creators",
            points: [
              "Convert travel videos into interactive AI assistants.",
              "Share personalized itineraries based on your journeys.",
              "Turn your content into a chatbot that engages your audience 24/7.",
              "Expand reach by repurposing videos into blogs, guides automatically.",
            ],
          },
          {
            title: "For Travelers & Audiences",
            points: [
              "Ask vlog-inspired chatbots for real itineraries and tips.",
              "Explore food spots, hidden gems, and activities shared in the vlogs.",
              "Save time researching — receive ready-made travel itineraries in seconds.",
              "Get AI-curated plans tailored to your interests, from favorite creators.",
            ],
          },
          {
            title: "Key Benefits",
            points: [
              "Reduce trip planning time with creator-proven routes.",
              "Improve trip quality with local insights from trusted vloggers.",
              "Increase creator engagement and new revenue streams.",
              "Secure and compliant with platform and data policies.",
            ],
          },
        ],
        image: "/images/product/product_travel_2.png",
        imagePosition: "left",
      },
      { id: "explore-devx", type: "component", component: "ExporeDevxToday" },
    ],
  },
};

export default solutionsData;
