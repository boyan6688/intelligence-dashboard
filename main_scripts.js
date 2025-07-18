import { generateChinaMacroEvents, generateInternationalMacroEvents } from './data_generator.js';
import { dataSources } from './data_sources.js';

document.addEventListener('DOMContentLoaded', () => {
    const chinaFeed = document.getElementById('china-feed');
    const internationalFeed = document.getElementById('international-feed');
    const modal = document.getElementById('data-sources-modal');
    const openModalBtn = document.getElementById('data-sources-btn');
    const closeModalBtn = document.getElementById('modal-close-btn');

    const chinaEvents = generateChinaMacroEvents();
    const internationalEvents = generateInternationalMacroEvents();

    populateFeed(chinaFeed, chinaEvents);
    populateFeed(internationalFeed, internationalEvents);
    populateDataSourcesModal();

    lucide.createIcons();
    addInteractions();

    openModalBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});

function getMSIStyle(score) {
    let scoreClass = 'msi-low';
    if (score > 85) {
        scoreClass = 'msi-high';
    } else if (score >= 60) {
        scoreClass = 'msi-medium';
    }
    const angle = (score / 100) * 360;
    return { scoreClass, angle };
}

function createEventCard(event) {
    const { msiScore, title, source, sourceType, summary, timestamp, analysis } = event;
    const { scoreClass, angle } = getMSIStyle(msiScore);

    const card = document.createElement('div');
    card.className = 'event-card p-4 flex flex-col space-y-4';

    card.innerHTML = `
        <div class="flex space-x-4">
            <div class="flex-shrink-0">
                <div class="msi-ring ${scoreClass}" style="--msi-angle: ${angle}deg;">
                    <span class="msi-score-text font-mono text-base font-semibold text-text-title">${msiScore}</span>
                </div>
            </div>
            <div class="flex-grow flex flex-col justify-between min-w-0">
                <div>
                    <h3 class="text-base font-medium text-text-title">${title}</h3>
                    <p class="text-sm text-text-main mt-2 leading-relaxed">${summary}</p>
                </div>
            </div>
        </div>

        <div class="pl-10">
            <div class="text-sm text-text-main py-3 border-t border-b border-border">
                <p class="font-semibold text-text-title mb-1">经济/金融学分析:</p>
                <p>${analysis.generalAnalysis.summary}</p>
                <div class="mt-2 text-xs space-y-1 text-text-auxiliary">
                    <p><strong class="font-medium text-text-main">影响周期:</strong> ${analysis.generalAnalysis.impactTerm}</p>
                    <p><strong class="font-medium text-text-main">主要影响行业:</strong> ${analysis.generalAnalysis.affectedIndustry}</p>
                </div>
            </div>

            <div class="mt-3">
                 <div class="analysis-dropdown-btn">
                    <span>查看市场影响</span>
                    <i data-lucide="chevron-down" class="ml-1 w-4 h-4"></i>
                </div>
                <div class="analysis-content">
                    <ul class="space-y-3">
                        ${analysis.marketImpacts.map(impact => `
                            <li class="impact-item">
                                <div class="impact-indicator ${getImpactClass(impact.impactLevel)}"></div>
                                <div>
                                    <p class="font-semibold text-text-title">${impact.market}: <span class="font-normal ${getImpactTextColor(impact.impactLevel)}">${impact.impactLevel}</span><span class="text-xs font-normal text-text-auxiliary ml-2">${impact.impactTerm}</span></p>
                                    <p class="text-sm text-text-auxiliary">${impact.reasoning}</p>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                    <div class="mt-4 pt-3 border-t border-border text-sm">
                        <p class="font-semibold text-text-title">应用原理:</p>
                        ${analysis.economicPrinciples.map(p => `
                            <div class="mt-2 text-xs">
                                <strong class="text-text-main">${p.principleName}</strong>
                                <p class="text-text-auxiliary leading-relaxed mt-1"><strong>白话解读：</strong>${p.explanation}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="flex items-center justify-between pt-3 border-t border-border">
            <div class="source-tag ${sourceType}">
                ${source}
            </div>
            <div class="text-xs text-text-auxiliary">
                ${timestamp}
            </div>
        </div>
    `;
    return card;
}

function getImpactClass(level) {
    if (level.includes('Bullish')) return 'bullish';
    if (level.includes('Bearish')) return 'bearish';
    return 'neutral';
}

function getImpactTextColor(level) {
    if (level.includes('Bullish')) return 'text-green-600';
    if (level.includes('Bearish')) return 'text-red-600';
    return 'text-text-auxiliary';
}


function populateFeed(feedElement, events) {
    if (!feedElement) return;
    events.forEach(event => {
        const cardElement = createEventCard(event);
        feedElement.appendChild(cardElement);
    });
}

function addInteractions() {
    document.querySelectorAll('.analysis-dropdown-btn').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            button.classList.toggle('expanded');
            content.classList.toggle('expanded');
            lucide.createIcons();
        });
    });
}

function populateDataSourcesModal() {
    const container = document.getElementById('modal-body');
    if (!container) return;

    const renderCategory = (title, sources) => {
        const categoryHtml = `
            <div class="source-category">
                <h3 class="text-lg font-semibold text-text-title mb-3">${title}</h3>
                ${Object.entries(sources).map(([groupTitle, sourceList]) => `
                    <div class="mb-4">
                        <h4 class="source-group-title">${groupTitle}</h4>
                        <div class="source-list">
                            ${sourceList.map(source => `<a href="${source.url}" target="_blank" rel="noopener noreferrer" class="text-sm text-text-main hover:text-blue-600 hover:underline transition-colors">${source.name}</a>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        return categoryHtml;
    };

    container.innerHTML = `
        ${renderCategory('国内宏观经济与金融数据源', dataSources.china)}\n        ${renderCategory('国际宏观经济与金融数据源', dataSources.international)}\n    `;
}
