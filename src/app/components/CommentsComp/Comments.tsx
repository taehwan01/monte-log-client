'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import styles from './Comments.module.css';

type Props = {
    repo: string;
    label: string;
    issueTerm: string;
};

export default function Comments({ repo, label, issueTerm }: Props) {
    const comments = useRef<HTMLDivElement>(null);

    const getCommentsScript = useCallback(() => {
        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';

        script.setAttribute('repo', repo);
        script.setAttribute('issue-term', issueTerm);
        script.setAttribute('label', label);
        script.setAttribute('theme', 'github-dark-orange');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;
        script.onload = () => {
            setTimeout(() => {
                if ((comments.current?.childElementCount ?? 0) > 1) {
                    comments.current?.firstChild?.remove();
                }
            }, 10);
        };
        return script;
    }, [repo, issueTerm, label]);

    useEffect(() => {
        if (comments.current) {
            const script = getCommentsScript();
            comments.current.appendChild(script);
        }
    }, [getCommentsScript]);

    return <div ref={comments} id={styles.comments}></div>;
}
