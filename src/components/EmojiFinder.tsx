import { useState, useEffect } from 'react';
import { fetchEmojis, type Emoji } from '../api/emojiApi';

export default function EmojiFinder() {
  const [query, setQuery] = useState<string>('');
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    fetchEmojis(query)
      .then((data) => {
        if (!cancelled) {
          setEmojis(data);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className="emoji-finder">
      <div className="emoji-finder__hero">
        <h1 className="emoji-finder__title">Emoji Finder</h1>
        <p className="emoji-finder__subtitle">Find emoji by keywords</p>

        <input
          className="emoji-finder__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search emoji..."
          autoFocus
        />
      </div>

      <div className="emoji-finder__content">
        {status === 'loading' && (
          <p className="emoji-finder__status">Loading...</p>
        )}

        {status === 'error' && (
          <p className="emoji-finder__status emoji-finder__status--error">
            Не удалось подключиться к серверу. Убедитесь, что сервер запущен на порту 3000.
          </p>
        )}

        {status === 'ready' && (
          <div className="emoji-finder__grid">
            {emojis.length === 0 ? (
              <p className="emoji-finder__empty">Эмодзи не найдены</p>
            ) : (
              emojis.map((item) => (
                <div className="emoji-card" key={item.title + item.emoji}>
                  <div className="emoji-card__symbol">{item.emoji}</div>
                  <div className="emoji-card__name">{item.title}</div>
                  <div className="emoji-card__keywords">
                    {item.keywords.split(' ').slice(0, 6).join(', ')}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}