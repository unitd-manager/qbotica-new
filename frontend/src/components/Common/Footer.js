"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faXTwitter, faLinkedinIn, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { DivTag, H5Tag, LITag, PTag, ULTag } from "./HTMLTags";

export default function Footer({ themeSettings = {}, footerMenus = {} }) {
  const pathname = usePathname();
  const isNewHomeStatic = pathname === '/new-home-static' || pathname === '/new-home-static/';
  const {
    copyright_text,
    social_link_1,
    social_link_2,
    social_link_3,
    social_link_4,
  } = themeSettings;

  const copyrightText = copyright_text || `© ${new Date().getFullYear()} qBotica. All rights reserved.`;

  const renderMenu = (menuItems, title) => {
    const listItems = Array.isArray(menuItems) && menuItems.length ? menuItems : [];

    return (
      <DivTag className="col mb-4 mb-md-0">
        <H5Tag className="text-uppercase">{title}</H5Tag>
        <ULTag className="list-unstyled mb-0">
          {listItems.map((item) => (
            <LITag key={item.id || item.url || item.title}>
              <Link href={item.url || '/'}>
                {item.title || 'Home'}
              </Link>
            </LITag>
          ))}
          {!listItems.length && (
            <LITag>
              <Link href="/">Home</Link>
            </LITag>
          )}
        </ULTag>
      </DivTag>
    );
  };

  return (
    <footer className="bottom-footer" style={isNewHomeStatic ? { background: 'linear-gradient(90deg, #020615 0%, #041428 35%, #071b3a 100%)', color: '#fff', borderTop: 'none' } : undefined}>
      <DivTag className="container bottom-dashed" style={isNewHomeStatic ? { borderBottom: 'none' } : undefined}>
        <DivTag className="menu-row row gx-2 gx-lg-5 gy-4">
          {renderMenu(footerMenus.first, 'Solutions')}
          {renderMenu(footerMenus.second, 'Services')}
          {renderMenu(footerMenus.third, 'Company')}
          {renderMenu(footerMenus.fourth, 'Resources')}
        </DivTag>
      </DivTag>
      <DivTag className="container bottom-text" style={isNewHomeStatic ? { color: '#fff' } : undefined}>
        <DivTag className="row social-row">
          <DivTag className="col-md-6 col-sm-6 copright-col">
            <PTag className="copyright-text">{copyrightText}</PTag>
          </DivTag>
          <DivTag className="col-md-6 col-sm-6 social-media-col">
            <ULTag className="social-ul">
              {themeSettings.social_link_2 && (
                <LITag><Link href={themeSettings.social_link_2}  target="_blank" >
                  <FontAwesomeIcon icon={faXTwitter} className="footer-social-media-icons" size="lg" />
                </Link>
                </LITag>
              )}
              {themeSettings.social_link_1 && (
                <LITag><Link href={themeSettings.social_link_1}  target="_blank" >
                  <FontAwesomeIcon icon={faSquareFacebook} className="footer-social-media-icons" size="lg"/>
                </Link>
                </LITag>
              )}
              {themeSettings.social_link_4 && (
                <LITag><Link href={themeSettings.social_link_4} target="_blank" >
                  <FontAwesomeIcon icon={faYoutube} className="footer-social-media-icons" size="lg"/></Link>
                </LITag>
              )}
              {themeSettings.social_link_3 && (
                <LITag>
                  <Link href={themeSettings.social_link_3} target="_blank" >
                  <FontAwesomeIcon icon={faLinkedinIn} className="footer-social-media-icons" size="lg" /></Link>
                </LITag>
              )}
            </ULTag>
          </DivTag>
        </DivTag>
      </DivTag>
    </footer>

  );
}
