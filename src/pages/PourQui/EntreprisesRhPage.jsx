import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PourQui.css';
import LogoSticker from '../../components/Common/LogoSticker';
import PourQuiPageHero from './PourQuiPageHero';
import meeting3 from '../../assets/meeting3.png';
import {
  SLIDES,
  ER_ENJEUX_ORDERED,
  ER_SERVICES,
  ER_STEPS,
  ER_OUTILS,
  ER_BENEFITS,
  ER_DIFFS,
  useReveal,
  useCounter,
  useAutoCycle,
  useSequentialReveal,
  Grad,
} from './pourQuiShared';

const slide = SLIDES[2];

export default function EntreprisesRhPage() {
  const navigate = useNavigate();

  const [enjRef, enjVis] = useReveal(0.1);
  const [svRef, svVis] = useReveal(0.1);
  const [stRef, stVis] = useReveal(0.1);
  const [ouRef, ouVis] = useReveal(0.1);
  const erPct = useCounter(86, 1200, ouVis);
  const [bnRef, bnVis] = useReveal(0.1);
  const [dfRef, dfVis] = useReveal(0.1);
  const [ctRef, ctVis] = useReveal(0.2);

  const [activeEnj, setActiveEnj] = useAutoCycle(enjVis, ER_ENJEUX_ORDERED.length, 2600);
  const [activeErBn, setActiveErBn] = useAutoCycle(bnVis, ER_BENEFITS.length, 2000);
  const revealedER = useSequentialReveal(dfVis, ER_DIFFS.length, 460);

  return (
    <div className="PQ-Root PQ-Root--subpage PQ-Root--ent">
      <PourQuiPageHero slide={slide}>
        <button type="button" className="ER-Btn ER-Btn--ghost PQ-Btn--hero-ghost" onClick={() => navigate('/contact')}>
          Échanger avec un expert
        </button>
      </PourQuiPageHero>

      <div className={`ER-Block ER-Block--white ${enjVis ? 'is-vis' : ''}`} ref={enjRef}>
        <LogoSticker size={80} top="5%" left="3%" rotation={-16} opacity={0.13} animation="float" hideMobile />
        <div className="ER-Inner">
          <div className="ER-Head">
            <span className="ER-Label">Enjeux RH</span>
            <h2 className="ER-Title">
              <Grad className="OR-Grad">Un sujet clé</Grad> pour vos équipes
            </h2>
            <p className="ER-Sub">
              La retraite impacte votre organisation à chaque étape.
              <br />
              Voici pourquoi agir maintenant.
            </p>
          </div>
          <div className="ER-Enjeux-Grid">
            {ER_ENJEUX_ORDERED.map((e, i) => (
              <div
                key={e.key}
                className={`ER-Enj-Card ${activeEnj === i ? 'is-active' : ''}`}
                style={{ '--ec': e.color, '--i': i }}
                onClick={() => setActiveEnj(i)}
                onMouseEnter={() => setActiveEnj(i)}
              >
                {activeEnj === i && <div className="ER-Enj-Bar" key={`enj-${i}`} />}
                <p className="ER-Enj-Title">{e.title}</p>
              </div>
            ))}
          </div>
          <div className="ER-Enjeux-Dots">
            {ER_ENJEUX_ORDERED.map((e, i) => (
              <button
                key={e.key}
                type="button"
                className={`ER-Enj-Dot ${activeEnj === i ? 'is-active' : ''}`}
                style={{ '--ec': e.color }}
                onClick={() => setActiveEnj(i)}
                aria-label={e.title}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={`ER-Block ER-Block--tint ${svVis ? 'is-vis' : ''}`} ref={svRef}>
        <div className="ER-Inner ER-Sv-Layout">
          <div className="ER-Sv-Left">
            <span className="ER-Label">Nos solutions</span>
            <h2 className="ER-Title">
              Des services <Grad className="OR-Grad">modulables</Grad>
              <br />
              selon vos besoins
            </h2>
            <p className="ER-Sub">Chaque entreprise est unique. Nous adaptons notre approche à votre structure et vos objectifs RH.</p>
          </div>
          <div className="OR-Sv-Bubbles">
            {ER_SERVICES.map((s, i) => (
              <div key={s.title} className="OR-Sv-Bubble ER-Sv-Bubble" style={{ '--i': i }}>
                <strong className="OR-Sv-Title">{s.title}</strong>
                <p className="OR-Sv-Desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`ER-Block ER-Block--dark ${stVis ? 'is-vis' : ''}`} ref={stRef}>
        <div className="ER-Inner">
          <div className="ER-Head ER-Head--light">
            <span className="ER-Label ER-Label--light">Expérience collaborateur</span>
            <h2 className="ER-Title ER-Title--white">
              Un accompagnement <Grad className="ER-Cyan">simple et engageant</Grad>
            </h2>
          </div>
          <div className="ER-Timeline">
            <div className="ER-TL-Rail">
              <div className="ER-TL-Track" style={{ width: stVis ? '100%' : '0%' }} />
            </div>
            {ER_STEPS.map((s, i) => (
              <div key={s.n} className={`ER-TStep ${i % 2 === 1 ? 'ER-TStep--up' : ''}`} style={{ '--i': i }}>
                <div className="ER-TStep-Badge">
                  <span>{s.n}</span>
                  <div className="ER-TStep-Ring" />
                </div>
                <div className="ER-TStep-Card">
                  <span className="ER-TStep-BgNum">{s.n}</span>
                  <h3 className="ER-TStep-Title">{s.title}</h3>
                  <p className="ER-TStep-Desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`ER-Block ER-Block--white ${ouVis ? 'is-vis' : ''}`} ref={ouRef}>
        <div className="ER-Inner ER-Ou-Layout">
          <div className="ER-Ou-Content">
            <span className="ER-Label">Outils & dispositifs</span>
            <h2 className="ER-Title">
              Des outils concrets <Grad className="ER-Cyan">pour vos équipes RH</Grad>
            </h2>
            <ul className="ER-Ou-List">
              {ER_OUTILS.map((o, i) => (
                <li key={i} className="ER-Ou-Item" style={{ '--i': i }}>
                  <div className="ER-Ou-Chk">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ER-Ou-Visual">
            <div className="ER-Ou-Card ER-Ou-Card--1">
              <div className="ER-Ou-CardHead">
                <div className="ER-Ou-CardDot" />
                <div className="ER-Ou-CardDot ER-Ou-CardDot--y" />
                <div className="ER-Ou-CardDot ER-Ou-CardDot--g" />
                <span className="ER-Ou-CardTitle">Tableau de bord RH</span>
              </div>
              <div className="ER-Ou-Bars">
                {[
                  { label: 'Projections retraite', pct: 87, color: 'var(--k-cyan)' },
                  { label: 'Bilans individuels', pct: 64, color: 'var(--k-green)' },
                  { label: 'Accompagnements', pct: 92, color: 'var(--k-blue)' },
                ].map((b, i) => (
                  <div key={i} className="ER-Ou-BarRow">
                    <div className="ER-Ou-BarMeta">
                      <span className="ER-Ou-BarLbl">{b.label}</span>
                      <span className="ER-Ou-BarPct">
                        {ouVis ? b.pct : 0}%
                      </span>
                    </div>
                    <div className="ER-Ou-BarTrack">
                      <div
                        className="ER-Ou-BarFill"
                        style={{
                          width: ouVis ? `${b.pct}%` : '0%',
                          background: b.color,
                          transitionDelay: `${0.3 + i * 0.18}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ER-Ou-Card ER-Ou-Card--2">
              <div className="ER-Ou-GaugeCont">
                <svg viewBox="0 0 120 70" className="ER-Ou-GaugeSvg">
                  <defs>
                    <linearGradient id="erGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00b6de" />
                      <stop offset="100%" stopColor="#4381C1" />
                    </linearGradient>
                  </defs>
                  <path d="M15 62 A 45 45 0 0 1 105 62" stroke="#e8edf5" strokeWidth="8" fill="none" strokeLinecap="round" />
                  <path
                    d="M15 62 A 45 45 0 0 1 105 62"
                    stroke="url(#erGrad2)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="141"
                    strokeDashoffset={ouVis ? '32' : '141'}
                    style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1) .5s' }}
                  />
                  <circle cx="60" cy="62" r="4" fill="url(#erGrad2)" opacity={ouVis ? '1' : '0'} style={{ transition: 'opacity .4s 1.8s' }} />
                </svg>
                <div className="ER-Ou-GaugeCenter">
                  <span className="ER-Ou-GaugeVal">
                    {erPct}
                    <span className="ER-Ou-GaugePct">%</span>
                  </span>
                  <span className="ER-Ou-GaugeSub">satisfaction</span>
                </div>
              </div>
              <div className="ER-Ou-CardTitle ER-Ou-CardTitle--center">Taux d&apos;accompagnement</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`ER-Block ER-Block--tint ${bnVis ? 'is-vis' : ''}`} ref={bnRef}>
        <div className="ER-Inner">
          <div className="ER-Head">
            <span className="ER-Label">Les bénéfices</span>
            <h2 className="ER-Title">
              Ce que vous <Grad className="ER-Cyan">y gagnez</Grad>
            </h2>
          </div>
          <div className="ER-Bn-Grid">
            {ER_BENEFITS.map((b, i) => (
              <div
                key={i}
                className={`ER-Bn-Card ${activeErBn === i ? 'is-active' : ''}`}
                style={{ '--bc': b.color, transitionDelay: bnVis ? `${i * 110}ms` : '0ms' }}
                onMouseEnter={() => setActiveErBn(i)}
              >
                {activeErBn === i && <div className="ER-Bn-Bar" key={`erbn-${i}`} />}
                <div className="ER-Bn-IcoWrap">{b.icon}</div>
                <strong className="ER-Bn-Title">{b.title}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`ER-Block ER-Block--white ${dfVis ? 'is-vis' : ''}`} ref={dfRef}>
        <div className="ER-Inner ER-Df-Layout">
          <div className="ER-Df-Panel">
            <div className="ER-Df-Orb ER-Df-Orb--1" />
            <div className="ER-Df-Orb ER-Df-Orb--2" />
            <p className="ER-Df-Tag">Pourquoi KapAvenir</p>
            <p className="ER-Df-Quote">
              &laquo; La retraite de vos collaborateurs est un enjeu RH stratégique. Nous en faisons une opportunité. &raquo;
            </p>
            <div className="ER-Df-Stats">
              <div className="ER-Df-Stat">
                <strong>94%</strong>
                <span>satisfaction collaborateurs</span>
              </div>
              <div className="ER-Df-Stat">
                <strong>3j</strong>
                <span>pour un bilan complet</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="ER-Df-Title">Ce qui nous distingue</h3>
            <div className="ER-Df-List">
              {ER_DIFFS.map((d, i) => (
                <div key={i} className={`ER-Diff-Row ${i < revealedER ? 'is-vis' : ''}`} style={{ '--i': i }}>
                  <div className={`ER-Diff-Chk ${i < revealedER ? 'is-drawn' : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`ER-CTA ${ctVis ? 'is-vis' : ''}`} ref={ctRef}>
        <div className="ER-Orb ER-Orb--1" />
        <div className="ER-Orb ER-Orb--2" />
        <div className="ER-CTA-Inner">
          <span className="ER-CTA-Eye">Passez à l&apos;action</span>
          <h2 className="ER-CTA-Title">Vous êtes intéressé(e)s par nos prestations ?</h2>
          <p className="ER-CTA-Sub">Un devis personnalisé en 48h — sans engagement.</p>
          <div className="ER-CTA-Btns">
            <button type="button" className="ER-Btn ER-Btn--white" onClick={() => navigate('/contact')}>
              Demander une démo gratuite
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button type="button" className="ER-Btn ER-Btn--outline" onClick={() => navigate('/contact')}>
              Contacter un conseiller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
