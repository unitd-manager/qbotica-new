import Image from 'next/image';
import { DivTag, H2Tag, H4Tag, PTag, SectionTag, SpanTag } from '@/components/Common/HTMLTags';
import { VisionBolt, VisionEye, VisionScale } from '@/components/Common/Icons';

const illustrations = [
  { src: '/assets/images/puzzle3.png', alt: 'Stops at insight illustration' },
  { src: '/assets/images/puzzle2.png', alt: "Doesn't execute illustration" },
  { src: '/assets/images/puzzle1.png', alt: 'Disconnected from reality illustration' },
];

function splitTitle(title = '') {
  const t = title.toString().trim();
  const lower = t.toLowerCase();

  if (lower.includes(' at ')) {
    const [a, b] = t.split(/ at /i);
    return { normal: `${a} at`, accent: b };
  }

  if (lower.includes(' from ')) {
    const [a, b] = t.split(/ from /i);
    return { normal: a, accent: `from ${b}` };
  }

  const parts = t.split(' ').filter(Boolean);
  if (parts.length <= 1) return { normal: t, accent: '' };
  return { normal: parts.slice(0, -1).join(' '), accent: parts.slice(-1).join(' ') };
}

export default function WhyAIFailsPanel({ data }) {
  if (!data) return null;

  const { main_title, subtitle, steps = [], show_numbers } = data;
  const showNumbers = show_numbers !== false;
  const icons = [VisionEye, VisionBolt, VisionScale];

  return (
    <SectionTag className="nh-problem-section">
      <DivTag className="container">
        <DivTag className="nh-problem-head">
          {main_title ? (
            <H2Tag className="nh-problem-title" dangerouslySetInnerHTML={{ __html: main_title }} />
          ) : null}
          {subtitle ? (
            <DivTag className="nh-problem-sub">
              <SpanTag className="nh-problem-dot" aria-hidden="true" />
              <SpanTag dangerouslySetInnerHTML={{ __html: subtitle }} />
              <SpanTag className="nh-problem-dot" aria-hidden="true" />
            </DivTag>
          ) : null}
        </DivTag>

        <DivTag className="nh-problem-grid">
          {steps.slice(0, 3).map((step, i) => {
            const num = String(i + 1).padStart(2, '0');
            const StepIcon = icons[i] || VisionEye;
            const illustration = illustrations[i];
            const { normal, accent } = splitTitle(step?.title || '');

            return (
              <DivTag className="nh-problem-card" key={`problem-${i}`}>
                <DivTag className="nh-problem-card-inner">
                  <DivTag className="nh-problem-card-top">
                    <DivTag className="nh-problem-ico" aria-hidden="true">
                      <StepIcon className="nh-problem-ico-svg" />
                    </DivTag>
                    {showNumbers ? (
                      <DivTag className="nh-problem-num" aria-hidden="true">
                        {num}
                      </DivTag>
                    ) : null}
                  </DivTag>

                  <DivTag className="nh-problem-card-body">
                    <DivTag className="nh-problem-text">
                      <H4Tag className="nh-problem-h">
                        {normal ? <SpanTag className="nh-problem-h-normal">{normal}</SpanTag> : null}{' '}
                        {accent ? <SpanTag className="nh-problem-h-accent">{accent}</SpanTag> : null}
                      </H4Tag>
                      <SpanTag className="nh-problem-underline" aria-hidden="true" />
                      <PTag className="nh-problem-p">{step?.description || ''}</PTag>
                    </DivTag>

                    <DivTag className="nh-problem-illu" aria-hidden="true">
                      {illustration ? (
                        <DivTag className="nh-problem-illu-media">
                          <Image
                            src={illustration.src}
                            alt={illustration.alt}
                            fill
                            sizes="260px"
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                          />
                        </DivTag>
                      ) : null}
                    </DivTag>
                  </DivTag>
                </DivTag>
              </DivTag>
            );
          })}
        </DivTag>
      </DivTag>
    </SectionTag>
  );
}
