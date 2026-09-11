import './stage1-validation-pass.css';

const SOLUTION_SQL = `SELECT
  news_article.title,
  news_source.name AS source_name
FROM news_article
JOIN news_source
  ON news_article.news_source_id = news_source.news_source_id;`;

function ensureSolutionReveal() {
  const currentStep = document.getElementById('current-step');
  const structure = currentStep?.querySelector('details.sql-structure');
  if (!structure || currentStep.querySelector('details.solution-reveal')) return;

  const details = document.createElement('details');
  details.className = 'optional-scaffold solution-reveal';
  details.innerHTML = `
    <summary>Show solution</summary>
    <div class="optional-scaffold-body">
      <pre><code>${SOLUTION_SQL}</code></pre>
      <p>This is one complete valid query. Revealing it does not change or run the editor.</p>
    </div>
  `;
  structure.insertAdjacentElement('afterend', details);
}

function ensurePredictionPremises() {
  const action = document.querySelector('.workspace-evidence-action.prediction-question');
  if (!action || action.querySelector('.prediction-premises')) return;

  const baseline = action.querySelector('.baseline-result');
  if (!baseline) return;

  const premises = document.createElement('div');
  premises.className = 'prediction-premises';
  premises.setAttribute('aria-label', 'Established facts for the prediction');
  premises.innerHTML = `
    <div><span>Starting rows</span><strong>18 article rows</strong></div>
    <div><span>Matches per article</span><strong>1 source row</strong></div>
  `;
  baseline.insertAdjacentElement('afterend', premises);
}

function applyValidationCorrections() {
  ensureSolutionReveal();
  ensurePredictionPremises();
}

function start() {
  const target = document.querySelector('.learning-panel') || document.body;
  const observer = new MutationObserver(applyValidationCorrections);
  observer.observe(target, { childList: true, subtree: true });
  applyValidationCorrections();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
