import NewHomeHeroBanner from '@/components/Layout/new-home-hero-banner';
import WhyAIFailsPanel from '@/components/Layout/why-ai-fails-panel';
import SectionFour from '@/components/Layout/home-section-7';
import TimelineSections from '@/components/Layout/timeline-sections';
import FooterCommonCTA from '@/components/Layout/footer-common-cta';
import FooterCommonCTAEmbossed from '@/components/Layout/footer-common-cta-embossed';
import ClientLogoSection from '@/components/Layout/home-client-logo-section';
import { DivTag, H2Tag, SectionTag } from '@/components/Common/HTMLTags';
import GeneralCTASection from '@/components/Layout/general-cta-section';
import ContentHighlight from '@/components/Layout/content-highlight-block';
import ImageWithKeyPoints from '@/components/Layout/image-with-keypoints';
import ImageKeyPointsModern from '@/components/Layout/image-keypoints-modern';
import ImageKeyPointsModern2 from '@/components/Layout/image-keypoints-modern-2';
import WhyEnterprisesChoose from '@/components/Layout/why-enterprises-choose-qbotica';
import ContentLayout from '@/components/Layout/content-layout';
import CommonPostPagesSlider from '@/components/Layout/common-posts-slider';
import AwardsSection from '@/components/Layout/home-awards';
import HealthcareAutomationModern from '@/components/Layout/healthcare-automation-modern';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '@/components/Common/Icons';
//import HeroSection from '@/components/Layout/HeroSection';

import WhyAIFailsModern from '@/components/Layout/why-ai-fails-modern';
import CommonPostPagesSliderModern from '@/components/Layout/common-posts-slider-modern';
import ImageKeyPointsNewModern from '@/components/Layout/image-key-points-new-modern';
import ClientLogoSectionModern from '@/components/Layout/home-client-logo-section-modern';
import ImageKeyPointsNewModern2 from '@/components/Layout/image-keypoints-new-modern2';
import GeneralCTASectionModern from '@/components/Layout/general-cta-section-modern';
import SectionModern from '@/components/Layout/section-modern';
import ContentHighlightModern from '@/components/Layout/content-highlight-modern-block';
import BackToTopButton from '@/components/Common/BackToTopButton';



//export const dynamic = 'force-static';
export const revalidate = false;
 import dynamic from 'next/dynamic';

// Completely bypasses the server-side caching mismatch by forcing client runtime
const HeroSection = dynamic(() => import('@/components/Layout/HeroSection'), {
 
  loading: () => <div style={{ backgroundColor: "#030712", minHeight: "100vh" }} />
});

export const metadata = {
  title: 'New Home',
  description: 'Static home-style page copy for new-home',
};

const bannerData = {
  page_type: 'home_two',
  sub_title: '',
  main_title: 'Agentic AI<br/>That Runs<br/>Your Business',
  description:
    '<p>Move beyond pilots and "assistants." <span class="nh-hero-brand">qBotica</span> runs your enterprise operations using Agentic AI to execute end-to-end workflows across your systems, documents, and decisions.</p>',
  button: { url: 'https://meetings.hubspot.com/automation-demo/scheduler', title: 'Request a Demo', target: '' },
  secondary_button: { url: 'https://meetings.hubspot.com/automation-demo/scheduler', title: 'See Agentic AI in Action', target: '' },
  inner_video: false,
  mobile_inner_video: false,
  image_position: 'right',
  hero_image: {
    url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/12/Untitled-design-2025-12-24T183307.902-1-1.webp',
    alt: 'Hero'
  },
  banner_two_images: [
    {
      main_image: {
        url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/12/Untitled-design-2025-12-24T183307.902-1-1.webp',
        alt: ''
      },
      secondary_image: {
        url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/12/Group-515-1.svg',
        alt: ''
      }
    },
    {
      main_image: {
        url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/12/happy-latin-businesswoman-standing-with-arms-crossed-against-isolated-background-1-1.webp',
        alt: ''
      },
      secondary_image: {
        url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/12/Group-512-1.svg',
        alt: ''
      }
    }
  ],
  padding: {
    padding_options: false,
    padding_position: [],
    desktop_padding: {},
    mobile_padding: {}
  },
};

const stepCardsData = {
  main_title: 'Why Most AI <span>Fails at Operations</span>?',
  subtitle: "It’s not the model. It’s how it works in the real world.",
  show_numbers: false,
  description: '',
  title_alignment: 'center',
  card_alignment: 'center',
  steps: [
    {
      column: 'col-md-4',
      title: 'Stops at Insight',
      type: 'description',
      text_align: 'left',
      title_style: {
        margin_bottom: '18px',
        line_height: '1.2',
        font_size: '20px'
      },
      description_style: {
        line_height: '1.8',
        font_size: '18px'
      },
      card_style: {
        padding: '40px 35px',
        min_height: '260px'
      },
      description:
        "Most tools tell you what's wrong but leave the fix to your team.",
    },
    {
      column: 'col-md-4',
      title: "Doesn't Execute",
      type: 'description',
      text_align: 'left',
      title_style: {
        margin_bottom: '18px',
        line_height: '1.2',
        font_size: '20px'
      },
      description_style: {
        line_height: '1.8',
        font_size: '18px'
      },
      card_style: {
        padding: '40px 35px',
        min_height: '260px'
      },
      description:
        "Assistants help individuals, but they don't complete workflows across systems.",
    },
    {
      column: 'col-md-4',
      title: 'Disconnected from Reality',
      type: 'description',
      text_align: 'left',
      title_style: {
        margin_bottom: '18px',
        line_height: '1.2',
        font_size: '20px'
      },
      description_style: {
        line_height: '1.8',
        font_size: '18px'
      },
      card_style: {
        padding: '40px 35px',
        min_height: '260px'
      },
      description:
        'AI sits outside of real operations, unable to handle documents, exceptions, and approvals.',
    },
  ],
  padding: {
    padding_options: true,
    padding_position: ['top', 'bottom'],
    desktop_padding: {
      padding_top_desktop: '50',
      padding_bottom_desktop: '55'
    },
    mobile_padding: {
      padding_top_mobile: '40',
      padding_bottom_mobile: '40'
    }
  },
};

const sectionThreeData = {
  main_title: 'How Agentic AI Runs Your Business',
  sub_title: '',
  description:
    'A complete AI-powered workflow that understands, decides, acts, and orchestrates business operations seamlessly.',
    
  timelines: [
    {
      left: {
        label: '01',
        title: 'Step 1 – Understand',
        subtitle:
          'Read documents, emails, and data across structured and unstructured sources.',
       
      },
      right: {
        description:
          'AI agents analyze enterprise information from CRMs, PDFs, spreadsheets, emails, and internal systems to understand context and intent.',
      },
    },

    {
      left: {
        description:
          'AI Decision Engine<br/>Rule Validation<br/>Contextual Intelligence',
      },
      right: {
        label: '02',
        title: 'Step 2 – Decide',
        subtitle:
          'Apply AI reasoning, business rules, and context to make informed decisions.',
       },
    },

    {
      left: {
        label: '03',
        title: 'Step 3 – Act',
        subtitle:
          'Execute actions across enterprise systems, applications, and workflows.',
       },
      right: {
        description:
          'Workflow Execution<br/>System Automation<br/>Cross-Platform Actions',
      },
    },

    {
      left: {
        description:
          'Multi-Agent Coordination<br/>Human-in-the-Loop<br/>Enterprise Scale Management',
      },
      right: {
        label: '04',
        title: 'Step 4 – Orchestrate',
        subtitle:
          'Coordinate agents, automation, and human input to manage real-world complexity.',
       },
    },
  ],

 

  padding: {
    padding_options: true,
    padding_position: ['top', 'bottom'],
    desktop_padding: {
      padding_top_desktop: '45',
      padding_bottom_desktop: '45',
    },
    mobile_padding: {
      padding_top_mobile: '50',
      padding_bottom_mobile: '45',
    },
  },
};


const sectionFourData = {
  variant: 'vision',
  kicker: 'THE VISION',
  main_title: 'The next generation of organizations will be natively agentic.',
  description:
    'For two hundred years, organizations have been built around the same constraint: humans were the only available unit of intelligent execution.<br/><br/>That assumption is now changing. qBotica helps enterprises shift from human-coordinated workflows to natively agentic operations, where agents become the default executor and humans stay focused on judgment, oversight, and strategy.',
  main_solutions: [
    {
      title: '',
      solutions_list: [
        {
          type: 'is_content',
          icon: 'bolt',
          title: 'Agents as default executor',
          description: 'Agents complete end-to-end workflows across your systems, not just assist with tasks.',
        },
        {
          type: 'is_content',
          icon: 'shield',
          title: 'Humans as strategic layer',
          description: 'People focus on oversight, judgment, and strategy while agents execute the work.',
        },
        {
          type: 'is_content',
          icon: 'book',
          title: 'Knowledge is encoded',
          description: 'Operational know-how becomes repeatable, auditable workflows that agents can run.',
        },
        {
          type: 'is_content',
          icon: 'scale',
          title: 'Non-linear scale',
          description: 'Execution capacity grows without linear headcount growth.',
        },
        {
          type: 'is_content',
          icon: 'eye',
          title: 'Every action observable',
          description: 'Track decisions, approvals, and outcomes with end-to-end visibility.',
        },
      ],
    },
  ],
  padding: {
    padding_options: true,
    padding_position: ['top', 'bottom'],
    desktop_padding: {
      padding_top_desktop: '45',
      padding_bottom_desktop: '40'
    },
    mobile_padding: {
      padding_top_mobile: '45',
      padding_bottom_mobile: '40'
    }
  },
};


const sectionFiveData = {
  display_options: ['main_title', 'description'],
  main_title: '',
  description:
    '<span style="font-size: 21px; line-height: 30px;">Powering operations for global leaders in Healthcare, Finance, Logistics, and Customer Service. We are Outcome focused, Enterprise proven Execution ready.</span>',
  cta_button: null,
  padding: {
    padding_options: true,
    padding_position: ['top', 'bottom'],
    desktop_padding: {
      padding_top_desktop: '45',
      padding_bottom_desktop: '40'
    },
    mobile_padding: {
      padding_top_mobile: '45',
      padding_bottom_mobile: '40'
    }
  },
};


const footerCommonCTAData = {
  display_options: ['main_title', 'description'],
  main_title: 'Agentic AI That Actually Works.',
  description:
    'Agentic AI is not chatbots or copilots. It’s an operating model where AI doesn’t just assist, it acts. It understands the work, makes the decision, and executes the task across your existing systems. It doesn’t stop at an insight, it completes the job.<br/><br/><strong><b>This is the shift from “How can AI help?” to “Let AI do it.”</b></strong>',
  cta_button: {
    title: 'Explore Agentic AI Workflows',
    url: 'https://qbdevweb.unitdtechnologies.com/services/agentic-ai-workflows',
    target: '_self',
  },
  padding: {
    padding_options: true,
    padding_position: ['top', 'bottom'],
    desktop_padding: {
      padding_top_desktop: '50',
      padding_bottom_desktop: '55'
    },
    mobile_padding: {
      padding_top_mobile: '40',
      padding_bottom_mobile: '40'
    }
  },
};


const footerCommonCTA2Data = {
  display_options: ['main_title', 'description'],
  main_title: 'We Don’t Deploy Tools. We Run Work.',
  description:
    'qBotica converges AI agents, automation, and orchestration into a single execution engine. We handle the messy reality of business: reading messy documents, making complex decisions, and taking action in legacy ERPs.<br/><br/><strong><b>This isn’t a demo. This is Agentic AI in production.</b></strong>',
  cta_button: null,
  padding: {
    padding_options: true,
    padding_position: ['top', 'bottom'],
    desktop_padding: {
      padding_top_desktop: '50',
      padding_bottom_desktop: '55'
    },
    mobile_padding: {
      padding_top_mobile: '40',
      padding_bottom_mobile: '40'
    }
  },
};


const clientLogoData = {
  main_title: 'Trust and Proof',
  logo_list: [
    { image: { url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/09/800px-Aramark_logo.svg-1.webp' } },
    { image: { url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/09/onsemi.webp' } },
    { image: { url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/09/polaris.webp' } },
    { image: { url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/09/presbyterian__20181210_160705554-1.webp' } },
    { image: { url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/09/tpl.webp' } },
    { image: { url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/08/United-way.webp' } },
    { image: { url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/08/University-of-phoenix-1.webp' } },
    { image: { url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/09/IPG-OUTLINE-BTN-RASTER-287-1.webp' } },
    { image: { url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/09/62051a764e162f000480edba-1.webp' } },
    { image: { url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/07/qbotica-leading-enterprises-9-150x150-1.webp' } },
    { image: { url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/09/dish.webp' } },
    { image: { url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/09/cdw-c-2023-rgb-1.webp' } },
  ],
  padding: {
    padding_options: false,
    padding_position: [],
    desktop_padding: {},
    mobile_padding: {}
  },
};

const generalCTASectionData = {
  display_options: [
    'main_title',
    'description',
    'cta_button',
    'secondary_cta_button',
  ],

  main_title: 'Ready to Run Your Business<br/>with Agentic AI?',

  description:
    "<p>Let's identify the workflows where we can create impact fastest and start executing.</p>",

  cta_button: {
    title: 'Request a Demo',
    url: 'https://meetings.hubspot.com/maheshv/web-demo',
    target: '_blank',
  },

  secondary_cta_button: {
    title: 'Talk to an Expert',
    url: 'https://meetings.hubspot.com/maheshv/web-demo',
    target: '_blank',
  },

 
 padding: {
    padding_options: true,

    padding_position: ['top', 'bottom'],

    desktop_padding: {
      padding_top_desktop: '45',
      padding_bottom_desktop: '40',
    },

    mobile_padding: {
      padding_top_mobile: '40',
      padding_bottom_mobile: '40',
    },
  },
};

const contentHighlightData1 = {
  title: 'Why Enterprises Choose qBotica?',

  description: `
    <ul>
      <li>Others sell tools. qBotica owns outcomes.</li>
      <li>Others deliver pilots. qBotica runs production workflows.</li>
      <li>Others separate AI, automation, and systems. qBotica orchestrates them together.</li>
      <li>Others leave execution to you. qBotica delivers it with you.</li>
    </ul>
  `,

  image: {
    url: '/assets/images/Whyenter.jpeg',
    alt: 'Content Highlight',
  },

  text_alignment: 'right',

  image_position: 'left',

  button: {
    title: 'Learn More',
    url: '#',
    target: '_self',
  },

  class_name: '',

  enable_animation: 'true',

  id: 'content-highlight-block',

  padding: {
    padding_options: true,

    padding_position: ['top', 'bottom'],

    desktop_padding: {
      padding_top_desktop: '80',
      padding_bottom_desktop: '80',
    },

    mobile_padding: {
      padding_top_mobile: '60',
      padding_bottom_mobile: '60',
    },
  },
};

const whyChooseData = (() => {
  try {
    const html = contentHighlightData1.description || '';
    const matches = Array.from(html.matchAll(/<li>(.*?)<\/li>/gms)).map(m => m[1].trim());
    const bullets = matches.map((t) => ({ title: t }));
    return {
      title: contentHighlightData1.title,
      bullets,
      image: contentHighlightData1.image,
      cta: contentHighlightData1.button || null,
      background: contentHighlightData1.background_color || ''
    };
  } catch (e) {
    return { title: contentHighlightData1.title, bullets: [], image: contentHighlightData1.image, cta: contentHighlightData1.button || null };
  }
})();

const imageKeyPointsData = {
  display_options: [
    'main_title',
    'sub_title',
    'description',
    'key_points',
    'image',
    'cta_button',
  ],

  image_position: 'right',

  image_col: 'col-md-6',

  content_col: 'col-md-6',

  vertical_align: 'center',

  title_position: 'top_center',

  main_title: 'Built for Enterprise Reality',

  sub_title: 'Running real business operations requires more than AI.',

  description: `
    <p>
      Delivered as a managed service, so you don’t just deploy AI. You run it.
    </p>
  `,

  key_point_title: 'What qBotica brings together',

  key_points: [
    { title: 'AI agents that understand and reason' },
    { title: 'Automation that executes at scale' },
    { title: 'Orchestration that connects systems and workflows' },
    { title: 'Governance to ensure control, compliance, and visibility' },
    { title: 'Human-in-the-loop where judgment is required' },
  ],

  cta_button: {
    title: 'Learn More',
    url: '#',
    target: '_self',
  },

  common_content: '',

  image: {
    url: '/assets/images/Built.jpeg',
    alt: 'Image With Keypoints',
    width: 650,
    height: 700,
  },

  background_color: '#f3f3f3',

  class_name: '',

  id: 'enterprise-reality',

  enable_animation: 'true',

  padding: {
    padding_options: true,

    padding_position: ['top', 'bottom'],

    desktop_padding: {
      padding_top_desktop: '120',
      padding_bottom_desktop: '120',
    },

    mobile_padding: {
      padding_top_mobile: '80',
      padding_bottom_mobile: '80',
    },
  },
};



const contentHighlightData = {
  title: 'Proven Enterprise Impact',

  description: `
    <p>
      This isn’t theory. This is execution at scale.
      Enterprises working with qBotica are seeing:
    </p>

    <ul>
      <li>Faster processing times across core operations</li>
      <li>Significant reduction in manual effort and operational cost</li>
      <li>Improved accuracy and consistency across workflows</li>
      <li>Greater visibility and control over business processes</li>
    </ul>

    <p>
      We focus on measurable outcomes that matter to your business.
    </p>
  `,

  image: {
    url: '/assets/images/Proven.jpeg',
    alt: 'Enterprise Impact',
  },

  text_alignment: 'right',

  image_position: 'left',

  button: {
    title: 'Learn More',
    url: '#',
    target: '_self',
  },

  class_name: '',

  enable_animation: 'true',

  id: 'content-highlight-impact',

  padding: {
    padding_options: true,

    padding_position: ['top', 'bottom'],

    desktop_padding: {
      padding_top_desktop: '120',
      padding_bottom_desktop: '120',
    },

    mobile_padding: {
      padding_top_mobile: '80',
      padding_bottom_mobile: '80',
    },
  },
};

const commonPostPagesSliderData = {
  main_title: '<span style="font-size: 50px;">NewsRoom</span>',

  common_description: `
    <p>
      Explore the latest enterprise AI transformation stories,
      automation breakthroughs, and operational success cases.
    </p>
  `,

  show_feature_image: 'yes',

  show_title: 'yes',

  show_description: 'yes',

  show_date: 'yes',

  posts: [
    {
      title:
        'How qBotica Took The Pain Out of Pricing using GenAI and Automation for a Large Financial Services Company',

      featuredImage: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/11/How-qBotica-Took-The-Pain-Out-of-Pricing-using-GenAI-and-Automation-2-150x150.webp',

      date: 'May 12, 2026',

      excerpt: `
        <p>
          AI-powered automation transformed enterprise pricing
          workflows and significantly reduced manual effort.
        </p>
      `,

      link: '#',
    },

    {
      title:
        'How qBotica Increased Claims Processing By Over 7x for a Top Healthcare Client',

      featuredImage: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/12/healthcare-form-AI-150x150.webp',

      date: 'May 10, 2026',

      excerpt: `
        <p>
          Intelligent document processing accelerated healthcare
          claims handling and operational efficiency.
        </p>
      `,

      link: '#',
    },

    {
      title:
        'How qBotica helped a Fortune 500 Technology Products Company to process 1Million+ Invoices each Year',

      featuredImage: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/08/How-qBotica-Helped-A-Fortune-500-Technology-Products-Company-To-Process-1-Million-Invoices-Each-Year-150x150.webp',

      date: 'May 08, 2026',

      excerpt: `
        <p>
          Enterprise invoice automation improved processing speed,
          visibility, and workflow accuracy.
        </p>
      `,

      link: '#',
    },

    {
      title:
        'How qBotica helped a Global Top 10 Bank reduce processing time by 75% and errors by 90%',

      featuredImage: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/08/How-qBotica-Helped-A-Global-Top-10-Bank-Reduce-Processing-Time-By-75-And-Errors-By-90-150x150.webp',

      date: 'May 06, 2026',

      excerpt: `
        <p>
          Banking automation streamlined operations while improving
          compliance and reducing operational errors.
        </p>
      `,

      link: '#',
    },

    {
      title:
        'How qBotica Helped a Leading Manufacturer Reduce Documentation Errors by 99%',

      featuredImage: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2024/09/Understanding-the-Fourth-Industrial-Revolution_-A-Shift-from-Expectations-131-150x150.jpg',

      date: 'May 04, 2026',

      excerpt: `
        <p>
          AI-driven automation reduced documentation bottlenecks
          and improved enterprise operational efficiency.
        </p>
      `,

      link: '#',
    },
  ],

 

  class_name: '',

  id: 'common-post-pages-slider',

  padding: {
    padding_options: true,

    padding_position: ['top', 'bottom'],

    desktop_padding: {
      padding_top_desktop: '120',
      padding_bottom_desktop: '120',
    },

    mobile_padding: {
      padding_top_mobile: '80',
      padding_bottom_mobile: '80',
    },
  },
};

const imageKeyPointsData1 = {
  display_options: [
    'main_title',
    'description',
    'image',
  ],

  image_position: 'right',

  image_col: 'col-md-6',

  content_col: 'col-md-6',

  vertical_align: 'top',

  main_title: 'Where Agentic AI Delivers Impact? Work qBotica Runs for You',

  sub_title: '',

  description: `
    <p>
      We focus on the workflows that matter most to your business.
    </p>

    <ul>
      <li>
        <strong>Claims and document processing</strong><br/>
        Automate intake, validation, and decisioning across high-volume documents.
      </li>
      <li>
        <strong>Finance and reconciliation</strong><br/>
        Streamline reporting, audits, and financial operations with accuracy and speed.
      </li>
      <li>
        <strong>Customer and contact center workflows</strong><br/>
        Enable faster response, resolution, and service execution.
      </li>
      <li>
        <strong>Logistics and operations coordination</strong><br/>
        Automate scheduling, communication, and operational decision-making.
      </li>
      <li>
        <strong>Back-office and shared services</strong><br/>
        Reduce manual work across HR, procurement, and internal operations.
      </li>
    </ul>
  `,

  key_point_title: '',

  key_points: [],

  cta_button: {
    title: 'Learn More',
    url: '#',
    target: '_self',
  },

  common_content: '',

  image: {
    url: '/assets/images/Ahentic.jpeg',
    alt: 'Agentic AI Impact',
  
  },

  background_color: '#f3f3f3',

  class_name: '',

  id: 'image-with-keypoints-impact',

  enable_animation: 'true',

  padding: {
    padding_options: true,

    padding_position: ['top', 'bottom'],

    desktop_padding: {
      padding_top_desktop: '140',
      padding_bottom_desktop: '190',
    },

    mobile_padding: {
      padding_top_mobile: '80',
      padding_bottom_mobile: '80',
    },
  },
};
const awardsSectionData = {
  main_title: '<span style="font-size: 40px; font-weight: bold; ">Awards and Recognitions</span>',

  award_and_certificate_list: [
    {
      image: {
        url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/07/Intelligent-Document-Processing-IDP-2022-PEAK-Matrix-Award-Logo-Star-Performer-2-300x126-1.webp',
      },
      title: 'Award 1',
    },

    {
      image: {
        url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/08/uipath-partner-diamond-lockup-digital-rgb-ob.webp',
      },
      title: 'Award 2',
    },
    {
      image: {
        url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2026/05/logo-smallbusiness.webp',
      },
      title: 'Award 3',
    },

    {
      image: {
        url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/07/certification-exam.svg',
      },
      title: 'Award 4',
    },

    {
      image: {
        url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/09/aws-1-1.webp',
      },
      title: 'Award 5',
    },

    {
      image: {
        url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/07/21972-312-soc-noncpa-300x298-1.webp',
      },
      title: 'Award 6',
    },

    {
      image: {
        url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/07/Picture-1-300x69-1.webp',
      },
      title: 'Award 7',
    },

    {
      image: {
        url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/12/Deloitte-500-badge.png',
      },
      title: 'Award 8',
    },

    {
      image: {
        url: 'https://qbwpadmin.unitdtechnologies.com/wp-content/uploads/2025/12/PBJ-FGC.png',
      },
      title: 'Award 9',
    }
  ],

  padding: {
    padding_options: true,

    padding_position: ['top', 'bottom'],

    desktop_padding: {
      padding_top_desktop: '120',
      padding_bottom_desktop: '120',
    },

    mobile_padding: {
      padding_top_mobile: '80',
      padding_bottom_mobile: '80',
    },
  },
};

const healthcareAutomationSolutionsData = {
  display_options: [
    'main_title',
    'description',
   
  ],

  main_title: 'Built on a Strong Enterprise Ecosystem',

  description: `
    <p>
      We work across leading enterprise platforms and technologies
      to deliver what works best for your environment.
      Our approach is platform-agnostic, outcome-driven,
      and designed to integrate into your existing systems
      without disruption.
    </p>
  `,



  image: {
    url: '/images/industry-automation.jpg',
    alt: 'Industry Automation Solutions',
  },

  text_alignment: 'left',

  image_position: 'right',

 
  common_content: '',

  class_name: '',

  enable_animation: 'true',

  id: 'healthcare-automation-solutions',

  padding: {
    padding_options: true,

    padding_position: ['top', 'bottom'],

    desktop_padding: {
      padding_top_desktop: '120',
      padding_bottom_desktop: '120',
    },

    mobile_padding: {
      padding_top_mobile: '80',
      padding_bottom_mobile: '80',
    },
  },
};

const homePartners = [
  {
    image: { url: '/assets/images/microsoft.png', alt: 'Microsoft' },
    description: 'Microsoft ecosystem integration',
  },
  {
    image: { url: '/assets/images/atolioo.png', alt: 'Atolio' },
    description: 'Atolio data intelligence and governance',
  },
  {
    image: { url: '/assets/images/aws-1-1.webp', alt: 'AWS' },
    description: 'AWS cloud infrastructure',
  },
  {
    image: { url: '/assets/images/uipath.webp', alt: 'UiPath' },
    description: 'UiPath automation and orchestration',
  },
];

export default function NewHomeStaticPage() {
  return (
    <DivTag className="home-page new-home-static">
      {/* <NewHomeHeroBanner data={bannerData} /> */}
      <HeroSection />
      {/* <HeroSection data={bannerData}/>        */}
        {/* <SectionFour data={sectionFiveData} /> */}
         <SectionModern data={sectionFiveData} />
      {/* <ClientLogoSection data={clientLogoData} /> */}
      <FooterCommonCTA data={footerCommonCTAData} />
      {/* <WhyAIFailsPanel data={stepCardsData} /> */}
      <WhyAIFailsModern data={stepCardsData} />  
           <FooterCommonCTAEmbossed data={footerCommonCTA2Data} />
         <TimelineSections data={sectionThreeData} />
      <SectionFour data={sectionFourData} />
      <AwardsSection data={awardsSectionData} />
      {/* <CommonPostPagesSlider data={commonPostPagesSliderData} /> */}
      <CommonPostPagesSliderModern data={commonPostPagesSliderData} />
      {/* <ImageKeyPointsModern data={imageKeyPointsData1} /> */}
      <ImageKeyPointsNewModern data={imageKeyPointsData1} />
      {/* <ContentHighlight data={contentHighlightData} /> */}
      <ContentHighlightModern data={contentHighlightData} />
      {/* <ImageKeyPointsModern2 data={imageKeyPointsData} /> */}
      <ImageKeyPointsNewModern2 data={imageKeyPointsData} />
      <WhyEnterprisesChoose data={whyChooseData} />
    <HealthcareAutomationModern data={healthcareAutomationSolutionsData} />
      <BackToTopButton />
     <SectionTag className="home-partners-section" id="home-partners">
        <DivTag className="container">
          <DivTag className="sub-section">
            <DivTag className="home-partners-card">
              <DivTag className="section-head">
                <H2Tag><strong>Partners</strong></H2Tag>
              </DivTag>

              <DivTag className="partner-logo-grid" role="list">
                {homePartners.map((partner, index) => {
                  const tooltipId = `partner-tip-${index}`;
                  return (
                    <DivTag
                      key={partner.image?.url || index}
                      className="partner-logo-card"
                      role="listitem"
                      tabIndex={0}
                      aria-label={partner.description || partner.image?.alt || 'Partner'}
                      aria-describedby={tooltipId}
                    >
                      <Image
                        src={partner.image?.url || '/assets/images/logo-placeholder.webp'}
                        alt={partner.image?.alt || 'Partner'}
                        width={220}
                        height={80}
                        className="partner-logo-img"
                      />
                      <DivTag className="partner-logo-tooltip" id={tooltipId} role="tooltip">
                        {partner.description || partner.image?.alt || 'Partner'}
                      </DivTag>
                    </DivTag>
                  );
                })}
              </DivTag>

              <DivTag className="home-partners-cta">
                <Link
                  href="https://qbdevweb.unitdtechnologies.com/partners"
                  className="btn primary-btn"
                  target="_self"
                >
                  View More <ArrowRight className="right-arrow-icon" />
                </Link>
              </DivTag>
            </DivTag>
          </DivTag>
        </DivTag>
      </SectionTag>
     <GeneralCTASection data={generalCTASectionData} />
     {/* <GeneralCTASectionModern data={generalCTASectionData} /> */}
      <ClientLogoSection data={clientLogoData} />
{/* <ClientLogoSectionModern data={clientLogoData} /> */}
    </DivTag>
  );
}
