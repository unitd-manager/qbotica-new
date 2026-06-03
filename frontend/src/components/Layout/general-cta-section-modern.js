"use client";

import Link from "next/link";
import styles from "./general-cta-section-modern.module.css";

import {
  DivTag,
  H2Tag,
  H5Tag,
  SectionTag,
} from "../Common/HTMLTags";

import { ArrowRight } from "../Common/Icons";

export default function GeneralCTASectionModern({
  data,
}) {

  if (!data || typeof data !== "object")
    return null;

  const {
    display_options = [],
    main_title,
    description,
    sub_description,
    cta_button,
    secondary_cta_button,
    class_name = "",
    id = "",
    padding = {},
  } = data;

  const showTitle =
    display_options.includes("main_title");

  const showDescription =
    display_options.includes("description") ||
    Boolean(description);

  const showSubDescription =
    display_options.includes(
      "sub_description"
    );

  const showCTA =
    display_options.includes("cta_button");

  const showSecondaryCTA =
    display_options.includes(
      "secondary_cta_button"
    );

  let paddingClass = "";

  if (
    padding?.padding_options === true
  ) {

    const {
      padding_position = [],
      desktop_padding = {},
      mobile_padding = {},
    } = padding;

    if (
      padding_position.includes("top")
    ) {

      if (
        desktop_padding?.padding_top_desktop
      ) {
        paddingClass += ` padding-top-desktop-${desktop_padding.padding_top_desktop}px`;
      }

      if (
        mobile_padding?.padding_top_mobile
      ) {
        paddingClass += ` padding-top-mobile-${mobile_padding.padding_top_mobile}px`;
      }
    }

    if (
      padding_position.includes(
        "bottom"
      )
    ) {

      if (
        desktop_padding?.padding_bottom_desktop
      ) {
        paddingClass += ` padding-bottom-desktop-${desktop_padding.padding_bottom_desktop}px`;
      }

      if (
        mobile_padding?.padding_bottom_mobile
      ) {
        paddingClass += ` padding-bottom-mobile-${mobile_padding.padding_bottom_mobile}px`;
      }
    }
  }

  return (

    <SectionTag
      id={id}
      className={`${styles.ctaSection} ${class_name}`}
    >

      {/* BACKGROUND */}
      <DivTag className={styles.bgGradient} />

      {/* GRID */}
      <DivTag className={styles.gridOverlay} />

      {/* GLOW */}
      <DivTag className={styles.glowOne} />
      <DivTag className={styles.glowTwo} />

      <DivTag className="container">

        <DivTag
          className={`sub-section ${paddingClass}`}
        >

          <DivTag className={styles.inner}>

            {/* LABEL */}
            <DivTag className={styles.label}>

              <span className={styles.labelDot} />

              <span>
                AI Powered Product Development
              </span>

            </DivTag>

            {/* TITLE */}
            {showTitle &&
              main_title && (

                <H2Tag
                  className={styles.mainTitle}
                  dangerouslySetInnerHTML={{
                    __html: main_title,
                  }}
                />

              )}

            {/* DESCRIPTION */}
            {showDescription &&
              description && (

                <DivTag
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />

              )}

            {/* SUB DESCRIPTION */}
            {showSubDescription &&
              sub_description && (

                <H5Tag
                  className={
                    styles.subDescription
                  }
                  dangerouslySetInnerHTML={{
                    __html:
                      sub_description,
                  }}
                />

              )}

            {/* BUTTONS */}
            <DivTag
              className={styles.buttonRow}
            >

              {showCTA &&
                cta_button?.url && (

                  <Link
                    href={cta_button.url}
                    target={
                      cta_button.target ||
                      "_self"
                    }
                    className={`${styles.btn} ${styles.primaryBtn}`}
                  >

                    <span>
                      {cta_button.title ||
                        "Get Started"}
                    </span>

                    <ArrowRight
                      className={
                        styles.arrow
                      }
                    />

                  </Link>

                )}

              {showSecondaryCTA &&
                secondary_cta_button?.url && (

                  <Link
                    href={
                      secondary_cta_button.url
                    }
                    target={
                      secondary_cta_button.target ||
                      "_self"
                    }
                    className={`${styles.btn} ${styles.secondaryBtn}`}
                  >

                    <span>
                      {secondary_cta_button.title ||
                        "Talk to an Expert"}
                    </span>

                  </Link>

                )}

            </DivTag>

          </DivTag>

        </DivTag>

      </DivTag>

    </SectionTag>

  );
}