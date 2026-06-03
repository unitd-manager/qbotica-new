import styles from './why-ai-fails-modern.module.css';

import {
  DivTag,
  H2Tag,
  H4Tag,
  PTag,
  SectionTag,
} from '@/components/Common/HTMLTags';

import {
  VisionBolt,
  VisionEye,
  VisionScale,
  VisionShield,
  VisionBook,
} from '@/components/Common/Icons';

export default function WhyAIFailsModern({ data }) {
  if (!data) return null;

  const { main_title, subtitle, steps = [] } = data;

  const icons = [VisionShield, VisionBook, VisionBolt];

  return (
    <SectionTag className={styles.problemSection} aria-labelledby="why-ai-fails-heading">
      <DivTag className="container">
        <DivTag className={styles.problemHead}>
          {main_title ? (
            <H2Tag
              id="why-ai-fails-heading"
              className={styles.problemTitle}
              dangerouslySetInnerHTML={{ __html: main_title }}
            />
          ) : null}

          {subtitle ? (
            <PTag
              className={styles.problemSubtitle}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          ) : null}
        </DivTag>

        <DivTag className={styles.problemGrid} role="list">
          {steps.slice(0, 3).map((step, i) => {
            const StepIcon = icons[i] || VisionEye;
            return (
              <DivTag className={styles.problemCard} key={`problem-${i}`} role="listitem">
                <DivTag className={styles.problemIcon}>
                  <StepIcon className={styles.problemIconSvg} aria-hidden="true" focusable={false} />
                </DivTag>

                <H4Tag className={styles.problemCardTitle}>
                  {step?.title}
                </H4Tag>

                <PTag className={styles.problemCardDesc}>
                  {step?.description}
                </PTag>
              </DivTag>
            );
          })}
        </DivTag>
      </DivTag>
    </SectionTag>
  );
}