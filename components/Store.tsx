import React from 'react';
import { STORE_FEATURES, ICONS } from '../constants';
import { panelClass, cardClass, pillMutedClass, primaryButtonClass, sectionHeadingClass, sectionSubtitleClass } from './ui/primitives';

const Store: React.FC = () => (
  <section className="space-y-8">
    <header className="space-y-3">
      <span className={`${pillMutedClass} inline-flex items-center gap-2 text-primary`}>{ICONS.STORE} Gem store</span>
      <h1 className={`${sectionHeadingClass} text-3xl`}>Cosmetics & boosters</h1>
      <p className={sectionSubtitleClass}>
        Spend your gems on seasonal cosmetics, productivity boosts, and challenge tokens. Inventory rotates every Monday.
      </p>
    </header>
    <div className={`${panelClass} p-6 md:p-8`}>
      <div className="grid gap-4 md:grid-cols-3">
        {STORE_FEATURES.map((item) => (
          <article key={item.id} className={`${cardClass} flex h-full flex-col gap-4 p-6`}>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-ink-muted">
              <span>{item.tag}</span>
              <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">{item.price} gems</span>
            </div>
            <h2 className="text-lg font-semibold text-ink-primary">{item.name}</h2>
            <p className="text-sm text-ink-secondary">{item.description}</p>
            <div className="mt-auto flex gap-2">
              <button className={primaryButtonClass}>Redeem</button>
              <button className="glass-button">Preview</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Store;
