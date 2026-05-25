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
} from '@/components/Common/Icons';

export default function WhyAIFailsModern({ data }) {
  if (!data) return null;

  const { main_title, subtitle, steps = [] } = data;

  const icons = [VisionEye, VisionBolt, VisionScale];

  return (
    <SectionTag className={styles.problemSection}>
      <DivTag className="container">
        <DivTag className={styles.problemHead}>
          {main_title ? (
            <H2Tag
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

        <DivTag className={styles.problemGrid}>
          {steps.slice(0, 3).map((step, i) => {
            const StepIcon = icons[i] || VisionEye;

            return (
              <DivTag
                className={styles.problemCard}
                key={`problem-${i}`}
              >
                <DivTag className={styles.problemIcon}>
                  <StepIcon className={styles.problemIconSvg} />
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