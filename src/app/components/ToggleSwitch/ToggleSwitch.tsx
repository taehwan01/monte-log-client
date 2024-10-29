'use client';

import styles from './ToggleSwitch.module.css';

interface ToggleSwitchProps {
    isDefault: boolean;
    onToggle: () => void;
}

export default function ToggleSwitch({ isDefault, onToggle }: ToggleSwitchProps) {
    return (
        <div
            className={`${styles.toggleSwitchContainer} ${
                isDefault ? styles.publicBackground : styles.privateBackground
            }`}
            role='switch'
            aria-checked={isDefault}
            tabIndex={0}
            onClick={onToggle}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    onToggle();
                }
            }}
        >
            <div className={`${styles.switch} ${isDefault ? styles.publicSwitch : styles.privateSwitch}`} />
        </div>
    );
}
