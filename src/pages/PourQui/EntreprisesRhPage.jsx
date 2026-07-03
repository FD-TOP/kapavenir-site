import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PourQui.css';
import LogoSticker from '../../components/Common/LogoSticker';
import PourQuiPageHero from './PourQuiPageHero';
import meeting1 from '../../assets/meeting1.jpg';
import meeting3 from '../../assets/meeting3.png';
import {
  SLIDES,
  ER_ENJEUX_ORDERED,
  ER_SERVICES,
  ER_STEPS,
  ER_BENEFITS,
  ER_DIFFS,
  useReveal,
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
  const [bnRef, bnVis] = useReveal(0.1);
  const [dfRef, dfVis] = useReveal(0.1);
  const [ctRef, ctVis] = useReveal(0.2);

  const [activeEnj, setActiveEnj] = useAutoCycle(enjVis, ER_ENJEUX_ORDERED.length, 2600);
  const [activeErSv, setActiveErSv] = useAutoCycle(svVis, ER_SERVICES.length, 2800);
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

          <div className="ER-Enjeux-Stage">
            <img
              src={meeting1}
              alt="Équipe RH en réunion autour des enjeux retraite"
              className="ER-Enjeux-Photo"
            />
            <div className="ER-Enjeux-Cards">
              <div className="ER-Enjeux-StackWrap">
                <div className="ER-Enjeux-Rail" aria-hidden>
                  <div
                    className="ER-Enjeux-RailFill"
                    style={{ height: `${((activeEnj + 1) / ER_ENJEUX_ORDERED.length) * 100}%` }}
                  />
                  {ER_ENJEUX_ORDERED.map((e, i) => (
                    <span
                      key={e.key}
                      className={`ER-Enjeux-RailDot${activeEnj === i ? ' is-active' : ''}${activeEnj > i ? ' is-done' : ''}`}
                      style={{ '--ec': e.color }}
                    />
                  ))}
                </div>
                <div className="ER-Enjeux-Stack">
                  {ER_ENJEUX_ORDERED.map((e, i) => (
                    <button
                      key={e.key}
                      type="button"
                      className={`ER-Enj-Item${activeEnj === i ? ' is-active' : ''}`}
                      style={{ '--ec': e.color, '--i': i }}
                      onClick={() => setActiveEnj(i)}
                      onMouseEnter={() => setActiveEnj(i)}
                      aria-pressed={activeEnj === i}
                    >
                      <span className="ER-Enj-Label">{e.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`ER-Block ER-Block--tint ${svVis ? 'is-vis' : ''}`} ref={svRef}>
        <div className="ER-Inner ER-Sv-Layout">
          <div className="ER-Sv-Left">
            <span className="ER-Label">Nos solutions</span>
            <h2 className="ER-Title">
              Des <Grad className="OR-Grad">services</Grad> <Grad className="OR-Grad">modulables</Grad>
              <br />
              selon vos <Grad className="OR-Green">besoins</Grad>
            </h2>
            <p className="ER-Sub">Chaque entreprise est unique. Nous adaptons notre approche à votre structure et vos objectifs RH.</p>
          </div>
          <div className="OR-Sv-Right">
            <div className="OR-Sv-Bubbles">
              {ER_SERVICES.map((s, i) => (
                <div
                  key={s.title}
                  className={`OR-Sv-Bubble ER-Sv-Bubble${activeErSv === i ? ' is-active' : ''}`}
                  style={{ '--sc': s.color, '--i': i }}
                  onMouseEnter={() => setActiveErSv(i)}
                  onClick={() => setActiveErSv(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveErSv(i);
                  }}
                >
                  {activeErSv === i && <div className="OR-Sv-Bar" aria-hidden="true" key={`ersvbar-${i}`} />}
                  <strong className="OR-Sv-Title">{s.title}</strong>
                  <p className="OR-Sv-Desc">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="OR-Sv-Dots" aria-hidden="true">
              {ER_SERVICES.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  className={`OR-Sv-Dot${activeErSv === i ? ' is-active' : ''}`}
                  style={{ '--sc': s.color }}
                  onClick={() => setActiveErSv(i)}
                  aria-label={`Voir ${s.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`ER-Block ER-Block--dark ${stVis ? 'is-vis' : ''}`} ref={stRef}>
        <div className="ER-Inner">
          <div className="ER-Head ER-Head--light">
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
                  <h3 className="ER-TStep-Title">{s.title}</h3>
                  <p className="ER-TStep-Desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`ER-Block ER-Block--tint ${bnVis ? 'is-vis' : ''}`} ref={bnRef}>
        <div className="ER-Inner">
          <div className="ER-Head">
            <h2 className="ER-Title">
              Ce que vous <Grad className="ER-Cyan">y gagnez</Grad>
            </h2>
          </div>
          <div className="ER-Bn-Deck">
            {ER_BENEFITS.map((b, i) => (
              <div
                key={i}
                className={`ER-Bn-Item ${activeErBn === i ? 'is-active' : ''}`}
                style={{ '--bc': b.color, transitionDelay: bnVis ? `${i * 110}ms` : '0ms' }}
                onMouseEnter={() => setActiveErBn(i)}
                onClick={() => setActiveErBn(i)}
              >
                <span className="ER-Bn-Pulse" aria-hidden="true" />
                <div className="ER-Bn-ItemBody">
                  <div className="ER-Bn-IconWrap">
                    <span className="ER-Bn-Icon">{b.icon}</span>
                  </div>
                  <strong className="ER-Bn-Label">{b.title}</strong>
                </div>
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
          <h2 className="ER-CTA-Title">
            Vous êtes intéressé(e)s par <Grad className="ER-Cyan">nos</Grad>{' '}
            <Grad className="ER-Cyan">prestations</Grad>
            <Grad className="ER-Cyan"> ?</Grad>
          </h2>
          <p className="ER-CTA-Sub">Un devis personnalisé en 48h, sans engagement.</p>
          <div className="ER-CTA-Btns">
            <button type="button" className="ER-Btn ER-Btn--white" onClick={() => navigate('/contact')}>
              Échanger avec un expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
