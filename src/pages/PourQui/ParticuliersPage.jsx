import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PourQui.css';
import LogoSticker from '../../components/Common/LogoSticker';
import PourQuiPageHero from './PourQuiPageHero';
import meeting3 from '../../assets/meeting3.png';
import {
  SLIDES,
  Icon,
  PROBLEMS,
  PROMISES,
  PT_SERVICES,
  PT_STEPS,
  PT_BENEFITS,
  PT_DIFFS,
  useReveal,
  useCounter,
  useAutoCycle,
  useSequentialReveal,
  renderBnParts,
} from './pourQuiShared';

const slide = SLIDES[0];

export default function ParticuliersPage() {
  const navigate = useNavigate();

  const [introRef, introVis] = useReveal(0.2);
  const age = useCounter(63, 1600, introVis);
  const montant = useCounter(1840, 2000, introVis);
  const [pbRef, pbVis] = useReveal();
  const [prRef, prVis] = useReveal();
  const [svRef, svVis] = useReveal();
  const [stRef, stVis] = useReveal();
  const [bnRef, bnVis] = useReveal();
  const [dfRef, dfVis] = useReveal();
  const [ctRef, ctVis] = useReveal(0.3);

  const [activeStep, setActiveStep] = useAutoCycle(stVis, PT_STEPS.length, 2400);
  const [activeBn, setActiveBn] = useAutoCycle(bnVis, PT_BENEFITS.length, 2000);
  const revealedDiffs = useSequentialReveal(dfVis, PT_DIFFS.length, 480);

  return (
    <div className="PQ-Root PQ-Root--subpage PQ-Root--part">
      <PourQuiPageHero slide={slide}>
        <button type="button" className="PQ-Btn PQ-Btn--solid" onClick={() => navigate('/services/bilan')}>
          Faire mon bilan retraite
        </button>
        <button type="button" className="PQ-Btn PQ-Btn--border PQ-Btn--hero-ghost" onClick={() => navigate('/contact')}>
          Estimer ma retraite
        </button>
      </PourQuiPageHero>

      <div className={`PQ-Block PQ-Block--gradient ${introVis ? 'is-vis' : ''}`} ref={introRef}>
        <LogoSticker size={95} top="6%" right="3%" rotation={15} opacity={0.16} animation="wobble" hideMobile />
        <div className="PQ-Block-Inner PQ-Split">
          <div className="PQ-Intro-Left">
            <span className="PQ-Label PQ-Label--blue">En chiffres</span>
            <h2 className="PQ-Block-Title">
              Des repères <span className="PQ-Grad">concrets</span> pour décider
            </h2>
            <p className="PQ-Block-Sub">L’âge moyen de départ et le montant de pension vous aident à situer votre situation.</p>
          </div>
          <div className="PQ-Counters">
            <div className="PQ-Counter PQ-Counter--a">
              <div className="PQ-Counter-Header">
                <div className="PQ-Counter-IcoWrap PQ-Counter-IcoWrap--a">{Icon.clock}</div>
                <span className="PQ-Counter-Tag">Âge moyen de départ</span>
              </div>
              <div className="PQ-Counter-ValRow">
                <span className="PQ-Counter-Big">{age}</span>
                <span className="PQ-Counter-Unit">ans</span>
              </div>
              <p className="PQ-Counter-Hint">Âge moyen de départ à la retraite en France</p>
              <div className="PQ-Counter-Track">
                <div className="PQ-Counter-Fill PQ-Counter-Fill--a" style={{ width: introVis ? `${Math.round((age / 70) * 100)}%` : '0%' }} />
                <span className="PQ-Counter-Pct">{introVis ? Math.round((age / 70) * 100) : 0}%</span>
              </div>
            </div>
            <div className="PQ-Counter PQ-Counter--b">
              <div className="PQ-Counter-Header">
                <div className="PQ-Counter-IcoWrap PQ-Counter-IcoWrap--b">{Icon.wallet}</div>
                <span className="PQ-Counter-Tag">Pension mensuelle estimée</span>
              </div>
              <div className="PQ-Counter-ValRow">
                <span className="PQ-Counter-Big">{montant.toLocaleString('fr-FR')}</span>
                <span className="PQ-Counter-Unit">€/mois</span>
              </div>
              <p className="PQ-Counter-Hint">Montant moyen de retraite tous régimes confondus</p>
              <div className="PQ-Counter-Track">
                <div className="PQ-Counter-Fill PQ-Counter-Fill--b" style={{ width: introVis ? `${Math.round((montant / 2000) * 100)}%` : '0%' }} />
                <span className="PQ-Counter-Pct">{introVis ? Math.round((montant / 2000) * 100) : 0}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`PQ-Block PQ-Block--light ${pbVis ? 'is-vis' : ''}`} ref={pbRef}>
        <LogoSticker size={70} bottom="10%" left="2%" rotation={-18} opacity={0.13} animation="float" hideMobile />
        <div className="PQ-Block-Inner PQ-Split PQ-Split--photo-right">
          <div className="PQ-Pb-Content">
            <span className="PQ-Label PQ-Label--slate">Le problème</span>
            <h2 className="PQ-Block-Title">
              La retraite est complexe…<br /><span className="PQ-Grad">mais ça ne devrait pas l’être</span>
            </h2>
            <div className="PQ-Pb-List">
              {PROBLEMS.map((p, i) => (
                <div key={i} className="PQ-Pb-Row" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="PQ-Pb-Ico">{p.icon}</div>
                  <span className="PQ-Pb-Text">{p.text}</span>
                  <div className="PQ-Pb-Cross">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="PQ-Photo-Wrap">
            <img src={meeting3} alt="Complexité retraite" className="PQ-Photo" />
            <div className="PQ-Photo-Float PQ-Photo-Float--tr">
              <div className="PQ-Float-Icon">{Icon.doc}</div>
              <span>+4 régimes différents</span>
            </div>
            <div className="PQ-Photo-Float PQ-Photo-Float--bl">
              <div className="PQ-Float-Icon">{Icon.alert}</div>
              <span>Droits souvent mal calculés</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`PQ-Block ${prVis ? 'is-vis' : ''}`} ref={prRef}>
        <LogoSticker size={88} top="5%" right="4%" rotation={-14} opacity={0.15} animation="wobble" hideMobile />
        <div className="PQ-Block-Inner">
          <div className="PQ-Head">
            <span className="PQ-Label PQ-Label--blue">Notre promesse</span>
            <h2 className="PQ-Block-Title">
              Une approche <span className="PQ-Grad">simple</span>, <span className="PQ-Grad">claire</span> et <span className="PQ-Grad">actionnable</span>
            </h2>
          </div>
          <div className="PQ-Promise-Grid">
            {PROMISES.map((p, i) => (
              <div key={i} className="PQ-Promise-Card" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="PQ-Promise-Top">
                  <div className="PQ-Promise-IcoBox">{p.icon}</div>
                </div>
                <h3 className="PQ-Promise-Title">{p.label}</h3>
                <p className="PQ-Promise-Desc">{p.desc}</p>
                <div className="PQ-Promise-Rule" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`PQ-Block PQ-Block--light ${svVis ? 'is-vis' : ''}`} ref={svRef}>
        <div className="PQ-Block-Inner">
          <div className="PQ-Head">
            <span className="PQ-Label PQ-Label--green">Nos services</span>
            <h2 className="PQ-Block-Title">Tout ce dont vous avez besoin</h2>
          </div>
          <div className="PQ-Sv-Grid">
            {PT_SERVICES.map((s, i) => (
              <div key={i} className="PQ-Sv-Card" style={{ '--sc': s.color, transitionDelay: `${i * 100}ms` }}>
                <div className="PQ-Sv-IcoWrap">{s.icon}</div>
                <div>
                  <h3 className="PQ-Sv-Title">{s.title}</h3>
                  <p className="PQ-Sv-Desc">{s.desc}</p>
                </div>
                <div className="PQ-Sv-Chevron">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`PQ-Block PQ-Block--process ${stVis ? 'is-vis' : ''}`} ref={stRef}>
        <div className="PQ-Block-Inner">
          <div className="PQ-Head">
            <span className="PQ-Label PQ-Label--blue">Le processus</span>
            <h2 className="PQ-Block-Title"><span className="PQ-Grad">Un parcours simple</span> en 4 étapes</h2>
            <p className="PQ-Head-Sub">De la première prise de contact à votre pension : un chemin clair et accompagné.</p>
          </div>
          <div className="PQ-Timeline">
            <div className="PQ-TL-Rail">
              <div className="PQ-TL-Track" style={{ width: stVis ? `${(activeStep / (PT_STEPS.length - 1)) * 100}%` : '0%' }} />
            </div>
            {PT_STEPS.map((s, i) => (
              <div
                key={i}
                className={`PQ-TStep${i % 2 === 1 ? ' PQ-TStep--down' : ''}${activeStep === i ? ' is-active' : ''}`}
                style={{ '--i': i }}
                onMouseEnter={() => setActiveStep(i)}
              >
                <div className="PQ-TStep-Badge">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <div className="PQ-TStep-Ring" />
                </div>
                <div className="PQ-TStep-Card">
                  <h3 className="PQ-TStep-Title">{s.title}</h3>
                  <p className="PQ-TStep-Desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`PQ-Block PQ-Block--light ${bnVis ? 'is-vis' : ''}`} ref={bnRef}>
        <div className="PQ-Block-Inner">
          <div className="PQ-Head">
            <span className="PQ-Label PQ-Label--green">Les bénéfices</span>
            <h2 className="PQ-Block-Title">Ce que vous y gagnez</h2>
          </div>
          <div className="PQ-Bn-Grid">
            {PT_BENEFITS.map((b, i) => (
              <div
                key={i}
                className={`PQ-Bn-Card${activeBn === i ? ' is-active' : ''}`}
                style={{ '--bc': b.color, transitionDelay: bnVis ? `${i * 110}ms` : '0ms' }}
                onMouseEnter={() => setActiveBn(i)}
              >
                {activeBn === i && <div className="PQ-Bn-Bar" key={`bnbar-${i}`} />}
                <div className="PQ-Bn-IcoWrap">{b.icon}</div>
                <strong className="PQ-Bn-Title">{renderBnParts(b.titleParts)}</strong>
                {b.subParts.length > 0 ? <span className="PQ-Bn-Sub">{renderBnParts(b.subParts)}</span> : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`PQ-Block PQ-Block--why ${dfVis ? 'is-vis' : ''}`} ref={dfRef}>
        <div className="PQ-Block-Inner PQ-Why-Grid">
          <div className="PQ-Why-Left">
            <h2 className="PQ-Block-Title" style={{ marginTop: 0 }}>
              Pourquoi <span className="PQ-Grad">KapAvenir ?</span>
            </h2>
            <div className="PQ-Diff-List">
              {PT_DIFFS.map((d, i) => (
                <div key={i} className={`PQ-Diff-Row${i < revealedDiffs ? ' is-revealed' : ''}`}>
                  <div className={`PQ-Diff-Chk${i < revealedDiffs ? ' is-drawn' : ''}`}>{Icon.check}</div>
                  <span className="PQ-Diff-Text">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`PQ-CTA-Section ${ctVis ? 'is-vis' : ''}`} ref={ctRef}>
        <div className="PQ-CTA-Inner">
          <p className="PQ-CTA-Pill">Passez à l’action</p>
          <h2 className="PQ-CTA-Title">Prenez quelques minutes aujourd’hui pour sécuriser des années de retraite</h2>
          <button type="button" className="PQ-Btn PQ-Btn--solid" onClick={() => navigate('/services/bilan')}>
            Faire mon bilan retraite
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
