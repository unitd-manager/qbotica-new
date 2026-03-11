'use client';

import { useEffect, useRef } from 'react';
import { DivTag, H3Tag, SectionTag } from '../Common/HTMLTags';
import Image from 'next/image';
import Link from 'next/link';
export default function CommonCta({ data }) {

    if (!data || typeof data !== 'object') return null;

    const {
        display_options = [],
        title,
        description,
        image,
        buttons = [],
        padding
    } = data;

    let paddingClass = '';

    if (padding?.padding_options === true) {
        const {
            padding_position = [],
            desktop_padding = {},
            mobile_padding = {}
        } = padding;

        if (padding_position.includes('top')) {
            if (desktop_padding?.padding_top_desktop)
                paddingClass += ` padding-top-desktop-${desktop_padding.padding_top_desktop}px`;
            if (mobile_padding?.padding_top_mobile)
                paddingClass += ` padding-top-mobile-${mobile_padding.padding_top_mobile}px`;
        }

        if (padding_position.includes('bottom')) {
            if (desktop_padding?.padding_bottom_desktop)
                paddingClass += ` padding-bottom-desktop-${desktop_padding.padding_bottom_desktop}px`;
            if (mobile_padding?.padding_bottom_mobile)
                paddingClass += ` padding-bottom-mobile-${mobile_padding.padding_bottom_mobile}px`;
        }
    }

    const showTitle = display_options.includes('title');
    const showDescription = display_options.includes('description');
    const showButtons = display_options.includes('buttons');

    return (
        <SectionTag className="image-cta-section">
            <DivTag className="container">
                <DivTag className={`row image-cta-wrapper ${paddingClass}`}>

                    {/* LEFT IMAGE */}
                    <DivTag className="col-lg-6 image-side">
                        {image?.url && (
                            <img src={image.url} alt={image.alt || 'CTA Image'} />
                        )}
                    </DivTag>

                    {/* RIGHT CONTENT */}
                    <DivTag className="col-lg-6 content-side">
                        <DivTag className="content-inner">

                            {showTitle && title && (
                                <H2Tag dangerouslySetInnerHTML={{ __html: title }} />
                            )}

                            {showDescription && description && (
                                <DivTag className="desc"
                                    dangerouslySetInnerHTML={{ __html: description }} />
                            )}

                            {showButtons && buttons?.length > 0 && (
                                <DivTag className="cta-buttons">
                                    {buttons.map((btn, index) => (
                                        btn?.url && (
                                            <Link
                                                key={index}
                                                href={btn.url}
                                                target={btn.target || '_self'}
                                                className="btn primary-btn"
                                            >
                                                {btn.title}
                                                <ArrowRight className="right-arrow-icon" />
                                            </Link>
                                        )
                                    ))}
                                </DivTag>
                            )}

                        </DivTag>
                    </DivTag>

                </DivTag>
            </DivTag>
        </SectionTag>
    );
}