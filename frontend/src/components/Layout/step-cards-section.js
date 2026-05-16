'use client';
import { useEffect, useRef } from 'react';
import { DivTag, H2Tag, H4Tag, H5Tag, LITag, PTag, SectionTag, SpanTag, ULTag } from '../Common/HTMLTags';
import Link from 'next/link';
import { ArrowRight, LiIcon, VisionBolt, VisionEye, VisionScale } from '../Common/Icons';
import Image from 'next/image';
import BoxGrid from '../Common/BoxGrid';

export default function BenefitsGridLayout({ data }) {
    const cardRefs = useRef([]);

    useEffect(() => {
        const observers = [];

        cardRefs.current.forEach((ref) => {
            if (!ref) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        ref.classList.add('animate-border');
                    }
                },
                { threshold: 0.5 }
            );

            observer.observe(ref);
            observers.push(observer);
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, []);


    if (!data) return null;

    const {
        main_title,
        description = "",
        button,
        steps = [],
        class_name,
        id,
        padding
    } = data;

    const getStepIcon = (card, index) => {
        const iconName = (card?.icon || card?.icon_name || '').toString().toLowerCase().trim();
        const title = (card?.title || '').toString().toLowerCase();

        if (iconName === 'eye' || iconName === 'insight') return VisionEye;
        if (iconName === 'bolt' || iconName === 'execute') return VisionBolt;
        if (iconName === 'scale' || iconName === 'disconnect') return VisionScale;

        if (title.includes('insight')) return VisionEye;
        if (title.includes("doesn't") || title.includes('doesnt') || title.includes('execute')) return VisionBolt;
        if (title.includes('disconnected') || title.includes('reality')) return VisionScale;

        if (index === 0) return VisionEye;
        if (index === 1) return VisionBolt;
        if (index === 2) return VisionScale;

        return null;
    };

    let paddingClass = '';
    if (padding.padding_options && padding.padding_options === true) {
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
    return (
        <SectionTag className={`step-card-section-warpper`}>
            <DivTag className={`step-card-section ${class_name}`} id={id}>
            <BoxGrid position="left" />
            <BoxGrid position="right" />
            <DivTag className="container">
                <DivTag className={`sub-section ${paddingClass}`}>
                    <DivTag className="row">
                        <DivTag className="col-md-12">
                            <DivTag className='section-head'>
                                {main_title && <H2Tag className="main-title" dangerouslySetInnerHTML={{ __html: main_title }} />}
                                {description && <DivTag className="para" dangerouslySetInnerHTML={{ __html: description }} />}
                            </DivTag>
                        </DivTag>
                    </DivTag>
                    {steps && (() => {
                        const rows = [];
                        let currentRow = [];
                        let rowWidth = 0;

                        steps.forEach((card, index) => {
                            const colClass = card.column || 'col-md-3';
                            const match = colClass.match(/col-md-(\d+)/);
                            const colSize = match ? parseInt(match[1]) : 3;

                            if (rowWidth + colSize > 12) {
                                rows.push(currentRow);
                                currentRow = [];
                                rowWidth = 0;
                            }

                            currentRow.push({ card, colSize, index });
                            rowWidth += colSize;
                        });

                        if (currentRow.length > 0) {
                            rows.push(currentRow);
                        }

                        return rows.map((row, rowIndex) => (
                            <DivTag className="row card-row justify-content-center" key={`row-${rowIndex}`}>
                                {row.map((item, idx) => {
                                    const { card, index } = item;
                                    let right = "";
                                    let left = "";
                                    const colClass = card.column || 'col-md-4';
                                    const animations = [
                                        'left-top-right-to-right-top-left',
                                        'bottom-left-to-bottom-right',
                                        'left-top-to-left-bottom last-col',
                                        'right-top-to-bottom-right first-col'
                                    ];

                                    return (
                                        <DivTag className={`${colClass} ${left} ${right} card-cols`} key={index}>
                                            <DivTag
                                                ref={(el) => (cardRefs.current[index] = el)}
                                                className={`card-col h-100 dashed-outline ${animations.join(' ')} ${card.type}`}
                                            >
                                                <span className="border-span top-line"></span>
                                                <span className="border-span bottom-line"></span>
                                                <span className="border-span left-line"></span>
                                                <span className="border-span right-line"></span>

                                                <DivTag className="content-div">
                                                    <DivTag className="step-title-wrapper">
                                                        <DivTag className="step-number-box">
                                                            {(() => {
                                                                const StepIcon = getStepIcon(card, index);
                                                                return StepIcon ? (
                                                                    <span className="step-icon" aria-hidden="true">
                                                                        <StepIcon className="step-icon-svg" />
                                                                    </span>
                                                                ) : (
                                                                    <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                                                                );
                                                            })()}
                                                        </DivTag>
                                                        <H5Tag className="card-col-title">{card.title}</H5Tag>
                                                    </DivTag>

                                                    {card.type === 'list' ? (
                                                        card.list?.length > 0 && (
                                                            <ULTag className="icon-list">
                                                                {card.list.map((listItem, liIndex) => (
                                                                    <LITag key={liIndex} className="list-with-icon">
                                                                        <PTag>
                                                                            <SpanTag className="li-title">{listItem.title}</SpanTag>
                                                                            <br />
                                                                            <SpanTag>{listItem.description}</SpanTag>
                                                                        </PTag>
                                                                    </LITag>
                                                                ))}
                                                            </ULTag>
                                                        )
                                                    ) : (
                                                        card.description && (
                                                            <DivTag
                                                                className={`${card.text_align === 'center'
                                                                    ? 'text-center'
                                                                    : card.text_align === 'justify'
                                                                        ? 'text-align-justify'
                                                                        : 'text-left'
                                                                    }`}
                                                                dangerouslySetInnerHTML={{ __html: card.description }}
                                                            />
                                                        )
                                                    )}
                                                </DivTag>
                                            </DivTag>
                                        </DivTag>
                                    );
                                })}
                            </DivTag>
                        ));
                    })()}
                    {button?.url && (
                        <DivTag className="btn-div">
                            <Link href={button.url} className="btn primary-btn" target={button.target || "_self"}>
                                {button.title} <ArrowRight className="right-arrow-icon" />
                            </Link>
                        </DivTag>
                    )}
                </DivTag>
            </DivTag>
            </DivTag>
        </SectionTag>
    );
}
