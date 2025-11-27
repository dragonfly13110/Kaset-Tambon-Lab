import React, { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
    canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords = 'เกษตรตำบล, เทคโนโลยีการเกษตร, AgTech, Smart Agriculture, AI เกษตร, เครื่องมือเกษตร',
    ogImage = '/og-image.jpg',
    ogType = 'website',
    canonical,
}) => {
    useEffect(() => {
        // Set document title
        document.title = title;

        // Helper function to set or update meta tags
        const setMetaTag = (name: string, content: string, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }

            element.setAttribute('content', content);
        };

        // Set basic meta tags
        setMetaTag('description', description);
        if (keywords) {
            setMetaTag('keywords', keywords);
        }

        // Set Open Graph tags
        setMetaTag('og:title', title, true);
        setMetaTag('og:description', description, true);
        setMetaTag('og:type', ogType, true);
        setMetaTag('og:image', ogImage, true);
        setMetaTag('og:site_name', 'Kaset Tambon Lab', true);

        // Set Twitter Card tags
        setMetaTag('twitter:card', 'summary_large_image');
        setMetaTag('twitter:title', title);
        setMetaTag('twitter:description', description);
        setMetaTag('twitter:image', ogImage);

        // Set canonical URL if provided
        if (canonical) {
            let linkElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

            if (!linkElement) {
                linkElement = document.createElement('link');
                linkElement.setAttribute('rel', 'canonical');
                document.head.appendChild(linkElement);
            }

            linkElement.setAttribute('href', canonical);
        }
    }, [title, description, keywords, ogImage, ogType, canonical]);

    return null;
};

export default SEO;
