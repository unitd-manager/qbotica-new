import Banner from '@/components/Layout/banner-layout';
import StepCardsSection from '@/components/Layout/step-cards-section';
import SectionFour from '@/components/Layout/home-section-7';
import TimelineSections from '@/components/Layout/timeline-sections';
import FooterCommonCTA from '@/components/Layout/footer-common-cta';
import ClientLogoSection from '@/components/Layout/home-client-logo-section';
import { DivTag } from '@/components/Common/HTMLTags';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata = {
  title: 'New Home',
  description: 'Static home-style page copy for new-home',
};

const bannerData = {
  page_type: 'home_two',
  sub_title: '',
  main_title: 'Agentic AI That Runs Your Business',
  description:
    '<p>Move beyond pilots and "assistants." qBotica runs your enterprise operations using Agentic AI to execute end-to-end workflows across your systems, documents, and decisions.</p>',
  button: { url: 'https://meetings.hubspot.com/automation-demo/scheduler', title: 'Request a Demo', target: '' },
  secondary_button: { url: 'https://meetings.hubspot.com/automation-demo/scheduler', title: 'See Agentic AI in Action', target: '' },
  inner_video: false,
  mobile_inner_video: false,
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
  main_title: 'Why Most AI Fails at Operations',
  description: '',
  title_alignment: 'center',
  card_alignment: 'center',
  steps: [
    {
      column: 'col-md-4',
      title: 'Stops at insight',
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
      title: "Doesn't execute",
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
      title: 'Disconnected from reality',
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
  description: '',
  timelines: [
    {
      left: {
        label: '01 Intro',
        title: 'First Conversation',
        subtitle: 'A 30-minute call to identify your highest-impact workflow.',
      },
      right: {
        description: 'Discovery Call — 30 min<br/>Intake Session',
      },
    },
    {
      left: {
        description: 'Intake Session',
      },
      right: {
        label: '02 Discovery',
        title: 'Deep Dive',
        subtitle: 'We sit with the people who do the work.',
      },
    },
    {
      left: {
        label: '03 Encode',
        title: 'Knowledge Capture',
        subtitle: 'Your team’s expertise becomes the blueprint.',
      },
      right: {
        note: 'Workflow Encoded',
      },
    },
    {
      left: {
        status: 'Agent v1.0 — Deployed ✓',
      },
      right: {
        label: '04 Build',
        title: 'Agent Development',
        subtitle: 'Custom agents built, tested, and deployed.First working version in two weeks.',
        description: '',
      },
    },
    {
      left: {
        label: '05 Improve',
        title: 'Continuous Feedback',
        subtitle: 'Your team flags issues. Agents improve autonomously.',
        description: '',
      },
      right: {
        note: 'Feedback received → Agent updated',
      },
    },
    {
      left: {
        label: '06 Expand',
        title: 'Enterprise Rollout',
        subtitle: 'One workflow proven. Then the next team. Then the organization.',
      },
      right: {
        note: '3 → 12 → Org-wide',
      },
    },
  ],
  padding: {
    padding_options: true,
    padding_position: ['top', 'bottom'],
    desktop_padding: {
      padding_top_desktop: '45',
      padding_bottom_desktop: '45'
    },
    mobile_padding: {
      padding_top_mobile: '50',
      padding_bottom_mobile: '45'
    }
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
  main_title: 'Agentic AI: AI That Actually Works.',
  description:
    '<span style="color: #ffffff;">Agentic AI is not chatbots or copilots. It’s an operating model where AI doesn’t just assist, it acts. It understands the work, makes the decision, and executes the task across your existing systems. It doesn’t stop at an insight, it completes the job.<br/><br/><strong><b>This is the shift from “How can AI help?” to “Let AI do it.”</b></strong></span>',
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


const footerCommonCTA2Data = {
  display_options: ['main_title', 'description'],
  main_title: 'We Don’t Deploy Tools. We Run Work.',
  description:
    '<span style="color: #ffffff;">qBotica converges AI agents, automation, and orchestration into a single execution engine. We handle the messy reality of business: reading messy documents, making complex decisions, and taking action in legacy ERPs.<br/><br/><strong><b>This isnt a demo. This is Agentic AI in production.</b></strong></span>',
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







export default function NewHomeStaticPage() {
  return (
    <DivTag className="home-page new-home-static">
      <Banner data={bannerData} />
      <ClientLogoSection data={clientLogoData} />
      <SectionFour data={sectionFiveData} />
      <FooterCommonCTA data={footerCommonCTAData} />
      <StepCardsSection data={stepCardsData} />
       <FooterCommonCTA data={footerCommonCTA2Data} />
         <TimelineSections data={sectionThreeData} />
      <SectionFour data={sectionFourData} />
    
     
    </DivTag>
  );
}
