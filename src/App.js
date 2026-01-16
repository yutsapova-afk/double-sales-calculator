import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Calculator, TrendingUp, DollarSign, Target, ChevronRight, Sparkles, PiggyBank, Rocket, Lightbulb, Play, Download } from 'lucide-react';

const COLORS = { primary: '#1F4E79', accent: '#E8F4FD' };

const TabBtn = ({ id, activeTab, setActiveTab, icon: Icon, label }) => (
  <button onClick={() => setActiveTab(id)} className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all" style={activeTab === id ? { backgroundColor: COLORS.primary, color: 'white' } : { backgroundColor: 'white', color: COLORS.primary, border: '1px solid #1F4E7930' }}>
    <Icon size={18} /><span className="hidden sm:inline">{label}</span>
  </button>
);

const Input = ({ label, value, onChange, suffix, hint }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium" style={{ color: COLORS.primary }}>{label}</label>
    <div className="relative">
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-3 border-2 rounded-xl font-semibold pr-12" style={{ backgroundColor: '#FFFBEB', borderColor: '#FCD34D', color: COLORS.primary }} />
      {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 font-medium" style={{ color: COLORS.primary + '80' }}>{suffix}</span>}
    </div>
    {hint && <p className="text-xs" style={{ color: COLORS.primary + '99' }}>{hint}</p>}
  </div>
);

const ResultCard = ({ icon: Icon, label, value, sub, hl }) => (
  <div className="p-5 rounded-2xl shadow-lg" style={{ backgroundColor: hl ? COLORS.primary : 'white', color: hl ? 'white' : COLORS.primary }}>
    <div className="flex items-start justify-between">
      <div><p className="text-sm mb-1" style={{ opacity: 0.7 }}>{label}</p><p className="text-2xl font-bold">{value}</p>{sub && <p className="text-xs mt-1" style={{ opacity: 0.6 }}>{sub}</p>}</div>
      <div className="p-3 rounded-xl" style={{ backgroundColor: hl ? 'rgba(255,255,255,0.2)' : COLORS.accent }}><Icon size={24} /></div>
    </div>
  </div>
);

const ExpenseRow = ({ expense, onUpdate, onRemove, isVar }) => (
  <div className="space-y-1">
    <div className="hidden sm:flex items-center gap-2 p-3 rounded-xl group" style={{ backgroundColor: COLORS.accent }}>
      <input type="text" value={expense.name} onChange={(e) => onUpdate(expense.id, 'name', e.target.value)} className="flex-1 px-3 py-2 bg-white border rounded-lg text-sm min-w-0" style={{ borderColor: COLORS.primary + '20', color: COLORS.primary }} />
      <input type="text" value={isVar ? expense.percent : expense.amount} onChange={(e) => onUpdate(expense.id, isVar ? 'percent' : 'amount', e.target.value)} className="w-24 px-3 py-2 border rounded-lg font-semibold text-right" style={{ borderColor: COLORS.primary + '20', color: COLORS.primary, backgroundColor: '#FFFBEB' }} />
      <span className="text-sm w-6" style={{ color: COLORS.primary + '80' }}>{isVar ? '%' : '₽'}</span>
      <button onClick={() => onRemove(expense.id)} className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-100" style={{ color: '#EF4444' }}><Trash2 size={18} /></button>
    </div>
    <div className="sm:hidden p-3 rounded-xl" style={{ backgroundColor: COLORS.accent }}>
      <input type="text" value={expense.name} onChange={(e) => onUpdate(expense.id, 'name', e.target.value)} className="w-full px-3 py-2 bg-white border rounded-lg text-sm mb-2" style={{ borderColor: COLORS.primary + '20', color: COLORS.primary }} />
      <div className="flex items-center gap-2">
        <input type="text" value={isVar ? expense.percent : expense.amount} onChange={(e) => onUpdate(expense.id, isVar ? 'percent' : 'amount', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg font-semibold" style={{ borderColor: COLORS.primary + '20', color: COLORS.primary, backgroundColor: '#FFFBEB' }} />
        <span className="text-sm" style={{ color: COLORS.primary + '80' }}>{isVar ? '%' : '₽'}</span>
        <button onClick={() => onRemove(expense.id)} className="p-2 rounded-lg hover:bg-red-100" style={{ color: '#EF4444' }}><Trash2 size={18} /></button>
      </div>
    </div>
    {expense.hint && <p className="text-xs ml-3" style={{ color: COLORS.primary + '80' }}>* {expense.hint}</p>}
  </div>
);

const RoadmapRow = ({ goal, reachN, note, hl, avgReach, reelsPerWeek }) => {
  const formatNum = (n) => !isFinite(n) || n <= 0 ? '—' : n >= 1e6 ? (n/1e6).toFixed(1)+'М' : n >= 1e3 ? (n/1e3).toFixed(1)+'К' : Math.round(n).toLocaleString('ru');
  const pubs = avgReach > 0 ? Math.max(1, Math.ceil(reachN / avgReach)) : 1;
  const weeks = avgReach > 0 && reelsPerWeek > 0 ? Math.max(1, Math.ceil(reachN / avgReach / reelsPerWeek)) : 1;
  return (
    <div className="p-4 rounded-xl" style={{ backgroundColor: hl ? COLORS.primary : COLORS.accent, color: hl ? 'white' : COLORS.primary }}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[200px]"><h3 className="font-bold">{goal}</h3><p className="text-sm" style={{ opacity: 0.7 }}>{note}</p></div>
        <div className="flex gap-6 text-center">
          <div><p className="text-xs" style={{ opacity: 0.6 }}>Охватов</p><p className="font-bold text-lg">{formatNum(reachN)}</p></div>
          <div><p className="text-xs" style={{ opacity: 0.6 }}>Публикаций</p><p className="font-bold text-lg">{pubs}</p></div>
          <div><p className="text-xs" style={{ opacity: 0.6 }}>Недель</p><p className="font-bold text-lg">{weeks}</p></div>
        </div>
      </div>
    </div>
  );
};

const CalculateButton = ({ onClick, calculated }) => (
  <button onClick={onClick} className="w-full py-4 px-6 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]" style={{ backgroundColor: calculated ? '#22C55E' : COLORS.primary }}>
    <Play size={24} fill="white" />
    {calculated ? 'Рассчитано! Нажмите снова при изменении' : 'РАССЧИТАТЬ'}
  </button>
);

const DoubleSalesCalculator = () => {
  const [products, setProducts] = useState({ tripwirePrice: '3000', flagshipPrice: '100000', upsellPrice: '0', maxFlagshipSales: '999' });
  const [conversions, setConversions] = useState({ reelsToBot: '2', botToLM: '70', lmToTR: '5', trToApplication: '30', applicationToFL: '20', lmToApplicationDirect: '1' });
  const [reach, setReach] = useState({ avgReelsReach: '3000', reelsPerWeek: '3', monthlyGrowth: '10' });

  const [fixedExpenses, setFixedExpenses] = useState([
    { id: 1, name: 'Платформа для курсов', amount: '2500', hint: 'GetCourse, Prodamus.XL' },
    { id: 2, name: 'Сервис для рассылки', amount: '2999', hint: 'SaleBot, BotHelp' },
    { id: 3, name: 'Подписки', amount: '0', hint: 'Нейросети, приложения, сервисы' },
    { id: 4, name: 'Монтажёр', amount: '0', hint: 'CapCut - самостоятельно' },
    { id: 5, name: 'Дизайнер', amount: '0', hint: 'Canva - самостоятельно' },
    { id: 6, name: 'Ассистент', amount: '0', hint: 'На старте не нужен' },
    { id: 7, name: 'Прочие', amount: '0', hint: 'Другие расходы' },
  ]);

  const [variableExpenses, setVariableExpenses] = useState([
    { id: 1, name: 'Комиссия платёжки', percent: '3.5', hint: '2.5-5%' },
    { id: 2, name: 'Комиссия за рассрочки', percent: '0', hint: 'Считайте средний показатель' },
    { id: 3, name: 'Налоги', percent: '6', hint: '4-15%' },
    { id: 4, name: 'Возвраты', percent: '5', hint: '2-10%' },
    { id: 5, name: 'Прочие %', percent: '0', hint: 'Другие %' },
  ]);

  const [startupExpenses, setStartupExpenses] = useState([
    { id: 1, name: 'Оборудование', amount: '0', hint: 'Свет, микрофон' },
    { id: 2, name: 'Дизайн', amount: '0', hint: 'Canva + шаблоны' },
    { id: 3, name: 'Настройка воронки', amount: '5000', hint: 'Делайте сами!' },
    { id: 4, name: 'Лендинг', amount: '0', hint: 'Tilda бесплатно' },
    { id: 5, name: 'Монтаж', amount: '0', hint: 'CapCut бесплатно' },
    { id: 6, name: 'Прочие', amount: '0', hint: 'Другие разовые' },
  ]);

  const [activeTab, setActiveTab] = useState('main');
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState(null);
  const [generating, setGenerating] = useState(false);
  const pdfRef = useRef(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeTab]);

  const num = (val) => parseFloat(String(val).replace(',', '.').replace(/[^\d.-]/g, '')) || 0;

  const calculate = () => {
    const p = { tripwirePrice: num(products.tripwirePrice), flagshipPrice: num(products.flagshipPrice), upsellPrice: num(products.upsellPrice), maxFlagshipSales: num(products.maxFlagshipSales) || 999 };
    const conv = { reelsToBot: num(conversions.reelsToBot)/100, botToLM: num(conversions.botToLM)/100, lmToTR: num(conversions.lmToTR)/100, trToApplication: num(conversions.trToApplication)/100, applicationToFL: num(conversions.applicationToFL)/100, lmToApplicationDirect: num(conversions.lmToApplicationDirect)/100 };
    const r = { avgReelsReach: num(reach.avgReelsReach), reelsPerWeek: num(reach.reelsPerWeek), monthlyGrowth: num(reach.monthlyGrowth) };
    const totalFixed = fixedExpenses.reduce((sum, e) => sum + num(e.amount), 0);
    const totalVarPercent = variableExpenses.reduce((sum, e) => sum + num(e.percent), 0) / 100;
    const totalStartup = startupExpenses.reduce((sum, e) => sum + num(e.amount), 0);
    const weeklyReach = r.avgReelsReach * r.reelsPerWeek;
    const monthlyReachBase = weeklyReach * 4;
    const weeklyBotSubs = weeklyReach * conv.reelsToBot;
    const weeklyLMViews = weeklyBotSubs * conv.botToLM;
    const weeklyTRSales = weeklyLMViews * conv.lmToTR;
    const weeklyApps = weeklyTRSales * conv.trToApplication + weeklyLMViews * conv.lmToApplicationDirect;
    const weeklyFLSales = Math.min(weeklyApps * conv.applicationToFL, p.maxFlagshipSales / 4);
    const weeklyRevTR = weeklyTRSales * p.tripwirePrice;
    const weeklyRevFL = weeklyFLSales * (p.flagshipPrice + p.upsellPrice);
    const weeklyRevTotal = weeklyRevTR + weeklyRevFL;
    const monthlyRev = weeklyRevTotal * 4;
    const monthlyProfit = monthlyRev * (1 - totalVarPercent) - totalFixed;
    const overallToTR = conv.reelsToBot * conv.botToLM * conv.lmToTR;
    const overallToFL = conv.reelsToBot * conv.botToLM * (conv.lmToTR * conv.trToApplication + conv.lmToApplicationDirect) * conv.applicationToFL;
    const convToApp = conv.reelsToBot * conv.botToLM * (conv.lmToTR * conv.trToApplication + conv.lmToApplicationDirect);
    const revPerReach = overallToTR * p.tripwirePrice + overallToFL * (p.flagshipPrice + p.upsellPrice);
    const calcScenario = (mult) => {
      const growthRate = 1 + (r.monthlyGrowth / 100);
      const months = [];
      let totalTR = 0, totalFL = 0, totalRev = 0;
      for (let m = 1; m <= 12; m++) {
        const mReach = monthlyReachBase * Math.pow(growthRate, m - 1);
        const mBot = mReach * conv.reelsToBot * mult;
        const mLM = mBot * conv.botToLM;
        const mTR = mLM * conv.lmToTR * mult;
        const mApps = mTR * conv.trToApplication * mult + mLM * conv.lmToApplicationDirect * mult;
        const mFL = Math.min(mApps * conv.applicationToFL * mult, p.maxFlagshipSales);
        const mRev = mTR * p.tripwirePrice + mFL * (p.flagshipPrice + p.upsellPrice);
        totalTR += mTR; totalFL += mFL; totalRev += mRev;
        months.push({ m, reach: mReach, bot: mBot, tr: mTR, apps: mApps, fl: mFL, rev: mRev });
      }
      return { months, totalTR, totalFL, totalRev, yearProfit: totalRev * (1 - totalVarPercent) - totalFixed * 12 };
    };
    const weeklyProfit = monthlyProfit / 4;
    const paybackWeeks = weeklyProfit > 0 ? Math.max(1, Math.ceil((totalStartup + totalFixed) / weeklyProfit)) : Infinity;
    setResults({ p, conv, r, totalFixed, totalVarPercent, totalStartup, weeklyReach, monthlyReachBase, weeklyBotSubs, weeklyLMViews, weeklyTRSales, weeklyApps, weeklyFLSales, weeklyRevTR, weeklyRevFL, weeklyRevTotal, monthlyRev, monthlyProfit, reachFirstTR: overallToTR > 0 ? 1 / overallToTR : Infinity, reachFirstFL: overallToFL > 0 ? 1 / overallToFL : Infinity, reach30Apps: convToApp > 0 ? 30 / convToApp : Infinity, reach100k: revPerReach > 0 ? 100000 / revPerReach : Infinity, reach1M: revPerReach > 0 ? 1000000 / revPerReach : Infinity, scenarios: { conservative: calcScenario(0.7), realistic: calcScenario(1.0), optimistic: calcScenario(1.3) }, totalInvestment: totalStartup + totalFixed, paybackWeeks });
    setCalculated(true);
  };

  const generatePDF = async () => {
    if (!results || !pdfRef.current) return;
    setGenerating(true);
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      const element = pdfRef.current;
      const footerEl = element.querySelector('#pdf-footer');
      const sections = Array.from(element.querySelectorAll('.pdf-section')); // без футера, футер отдельно

      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const bottomReserve = 22; // запас под номер страницы + чтобы текст не резало
      
      let currentY = margin;
      let pageNum = 1;
      const pageContents = [[]];
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const canvas = await html2canvas(section, { 
          scale: 2, 
          useCORS: true, 
          logging: false,
          backgroundColor: '#ffffff'
        });
        
        const imgWidth = pdfWidth - margin * 2;
const imgHeight = (canvas.height * imgWidth) / canvas.width;

// доступная высота для контента на странице
const maxPageY = pdfHeight - margin - bottomReserve;

// если секция помещается целиком
if (imgHeight <= (maxPageY - margin)) {
  if (currentY + imgHeight > maxPageY && currentY > margin) {
    pageNum++;
    pageContents.push([]);
    currentY = margin;
  }

  pageContents[pageNum - 1].push({
    canvas,
    y: currentY,
    width: imgWidth,
    height: imgHeight
  });

  currentY += imgHeight + 3;
} else {
  // секция выше одной страницы: режем canvas на куски по высоте
  const pxPerMm = canvas.height / imgHeight; // сколько пикселей приходится на 1 мм в PDF
  const sliceMm = maxPageY - margin;         // сколько мм контента помещается на пустой странице
  const slicePx = Math.floor(sliceMm * pxPerMm);

  let yPx = 0;

  while (yPx < canvas.height) {

    const remainingPx = canvas.height - yPx;
    const curSlicePx = Math.min(slicePx, remainingPx);

    // создаём кусок
    const sliceCanvas = document.createElement('canvas');
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = curSlicePx;

    const ctx = sliceCanvas.getContext('2d');
    ctx.drawImage(
      canvas,
      0, yPx, canvas.width, curSlicePx,   // source
      0, 0, canvas.width, curSlicePx      // dest
    );

    const sliceHeightMm = (curSlicePx * imgWidth) / canvas.width;

    // если кусок не влезает в текущую страницу, начинаем новую
    if (currentY + sliceHeightMm > maxPageY && currentY > margin) {
      pageNum++;
      pageContents.push([]);
      currentY = margin;
    }

    pageContents[pageNum - 1].push({
      canvas: sliceCanvas,
      y: currentY,
      width: imgWidth,
      height: sliceHeightMm
    });

    currentY += sliceHeightMm + 3;
    yPx += curSlicePx;

  }
}

      }

      // --- FOOTER CANVAS (рендерим отдельно) ---
      let footerCanvas = null;
      let footerImgHeight = 0;
      let footerImgWidth = 0;
      
      if (footerEl) {
        footerCanvas = await html2canvas(footerEl, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });
      
        footerImgWidth = pdfWidth - margin * 2;
        footerImgHeight = (footerCanvas.height * footerImgWidth) / footerCanvas.width;
      }

            // --- ДОБАВЛЯЕМ ФУТЕР ТОЛЬКО НА ПОСЛЕДНЮЮ СТРАНИЦУ ВНИЗ ---
      if (footerCanvas) {
        const footerY = pdfHeight - margin - footerImgHeight; // самый низ
      
        // последняя страница
        const lastPageIndex = pageContents.length - 1;
      
        // если на последней странице контент залезает в зону футера, добавляем новую страницу
        const items = pageContents[lastPageIndex];
        const lastBottom = items.length
          ? Math.max(...items.map(it => it.y + it.height))
          : margin;
      
        const footerSafeTop = footerY - 3; // небольшой зазор
      
        if (lastBottom > footerSafeTop) {
          pageContents.push([]);
        }
      
        const finalLastIndex = pageContents.length - 1;
      
        pageContents[finalLastIndex].push({
          canvas: footerCanvas,
          y: footerY,
          width: footerImgWidth,
          height: footerImgHeight,
          __isFooter: true,
        });
      }

      const totalPages = pageContents.length;
      
      for (let p = 0; p < pageContents.length; p++) {
        if (p > 0) pdf.addPage();
        
        const items = pageContents[p];
        for (const item of items) {

          const imgData = item.canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', margin, item.y, item.width, item.height);
        }

              // кликабельная ссылка поверх футера (только на странице, где он есть)
      const footerItem = items.find(it => it.__isFooter);
      if (footerItem) {
        const linkUrl = 'https://julietsapova.com/';
        const linkW = 90;
        const linkH = 8;
        const linkX = (pdfWidth - linkW) / 2;
      
        // лучше привязаться к реальной позиции футера
        const linkY = footerItem.y + footerItem.height - 12;
      
        pdf.link(linkX, linkY, linkW, linkH, { url: linkUrl });
      }

        
        pdf.setFontSize(9);
        pdf.setTextColor(150, 150, 150);
        pdf.text((p + 1) + ' / ' + totalPages, pdfWidth - margin, pdfHeight - 7, { align: 'right' });
      }
      
      pdf.save('Double_Sales_Report.pdf');
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Ошибка при создании PDF. Попробуйте ещё раз.');
    }
    
    setGenerating(false);
  };

  const resetCalc = () => setCalculated(false);
  const formatNum = (n) => !isFinite(n) ? '—' : n >= 1e6 ? (n/1e6).toFixed(1)+'М' : n >= 1e3 ? (n/1e3).toFixed(1)+'К' : Math.round(n).toLocaleString('ru');
  const formatCur = (n) => !isFinite(n) ? '—' : new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₽';

  // PDF Report Component - русский текст, html2canvas отрендерит кириллицу
  const PDFReport = React.forwardRef(({ results, fixedExpenses, variableExpenses, startupExpenses }, ref) => {
    if (!results) return null;
    
    const nonZeroFixed = fixedExpenses.filter(e => num(e.amount) > 0);
    const nonZeroVar = variableExpenses.filter(e => num(e.percent) > 0);
    const nonZeroStartup = startupExpenses.filter(e => num(e.amount) > 0);
    const showUpsell = results.p.upsellPrice > 0;
    const showMaxSales = results.p.maxFlagshipSales !== 999;
    
    const Section = ({ title, children }) => (
      <div className="pdf-section" style={{ marginBottom: 12, backgroundColor: 'white' }}>
        <div style={{ backgroundColor: COLORS.primary, color: 'white', padding: '10px 16px', fontSize: 14, fontWeight: 'bold' }}>{title}</div>
        {children}
      </div>
    );

    
    const Row = ({ label, value, bold, highlight }) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', backgroundColor: highlight ? COLORS.primary : COLORS.accent, color: highlight ? 'white' : '#333', borderBottom: '1px solid white', fontSize: 12 }}>
        <span style={{ fontWeight: bold ? 'bold' : 'normal' }}>{label}</span>
        <span style={{ fontWeight: 'bold' }}>{value}</span>
      </div>
    );

      const chunk = (arr, size) => {
        const res = [];
        for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
        return res;
      };
      
      // сколько строк расходов максимум на 1 странице
      const EXP_ROWS_PER_PAGE = 15;

    return (
      <div ref={ref} style={{ width: 794, padding: 20, backgroundColor: 'white', fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#333' }}>
        {/* Header */}
        <div className="pdf-section" style={{ backgroundColor: COLORS.primary, color: 'white', padding: '25px 20px', textAlign: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 5 }}>DOUBLE SALES</div>
          <div style={{ fontSize: 14, opacity: 0.9 }}>Система продаж</div>
        </div>
        
        {/* ПРОДУКТЫ */}
        <Section title="ПРОДУКТЫ">
          <Row label="Цена трипваера" value={formatCur(results.p.tripwirePrice)} />
          <Row label="Цена флагмана" value={formatCur(results.p.flagshipPrice)} />
          {showUpsell && <Row label="Допродажи" value={formatCur(results.p.upsellPrice)} />}
          {showMaxSales && <Row label="Мест на ФЛ/мес" value={results.p.maxFlagshipSales} />}
        </Section>
        
        {/* ОХВАТЫ */}
        <Section title="ОХВАТЫ">
          <Row label="Средний охват публикации" value={formatNum(results.r.avgReelsReach)} />
          <Row label="Публикаций в неделю" value={results.r.reelsPerWeek} />
          <Row label="Рост охватов/мес" value={results.r.monthlyGrowth + '%'} />
        </Section>
        
        {/* КОНВЕРСИИ */}
        <Section title="КОНВЕРСИИ ВОРОНКИ">
          <Row label="Контент → переход в бот" value={(results.conv.reelsToBot * 100).toFixed(1) + '%'} />
          <Row label="Бот → просмотр ЛМ" value={(results.conv.botToLM * 100).toFixed(0) + '%'} />
          <Row label="ЛМ → покупка ТР" value={(results.conv.lmToTR * 100).toFixed(1) + '%'} />
          <Row label="ТР → заявка на ФЛ" value={(results.conv.trToApplication * 100).toFixed(0) + '%'} />
          <Row label="Заявка → покупка ФЛ" value={(results.conv.applicationToFL * 100).toFixed(0) + '%'} />
          {results.conv.lmToApplicationDirect > 0 && <Row label="ЛМ/Контент → заявка напрямую" value={(results.conv.lmToApplicationDirect * 100).toFixed(1) + '%'} />}
        </Section>
        
        {/* РЕЗУЛЬТАТЫ */}
        <Section title="РЕЗУЛЬТАТЫ (в неделю)">
          <Row label="Охватов" value={formatNum(results.weeklyReach)} />
          <Row label="Подписок в бот" value={results.weeklyBotSubs.toFixed(1)} />
          <Row label="Просмотров ЛМ" value={results.weeklyLMViews.toFixed(1)} />
          <Row label="Продаж ТР" value={results.weeklyTRSales.toFixed(2)} />
          <Row label="Заявок на ФЛ" value={results.weeklyApps.toFixed(2)} />
          <Row label="Продаж ФЛ" value={results.weeklyFLSales.toFixed(3)} />
          <Row label="Выручка в неделю" value={formatCur(results.weeklyRevTotal)} bold highlight />
          <Row label="Выручка в месяц" value={formatCur(results.monthlyRev)} bold highlight />
          <Row label="Прибыль в месяц" value={formatCur(results.monthlyProfit)} bold highlight />
        </Section>
        
        {/* ЦЕЛИ */}
        <Section title="СКОЛЬКО НУЖНО ДЛЯ ЦЕЛЕЙ">
          {[
            { name: 'Первая продажа ТР', reach: results.reachFirstTR },
            { name: 'Первая продажа ФЛ', reach: results.reachFirstFL },
            { name: '30 заявок на ФЛ', reach: results.reach30Apps },
            { name: '100 000 ₽', reach: results.reach100k },
            { name: '1 000 000 ₽', reach: results.reach1M },
          ].map((g, i) => {
            const pubs = results.r.avgReelsReach > 0 ? Math.max(1, Math.ceil(g.reach / results.r.avgReelsReach)) : 1;
            const weeks = results.r.avgReelsReach > 0 && results.r.reelsPerWeek > 0 ? Math.max(1, Math.ceil(g.reach / results.r.avgReelsReach / results.r.reelsPerWeek)) : 1;
            return <Row key={i} label={g.name} value={formatNum(g.reach) + ' охв / ' + pubs + ' публ / ' + weeks + ' нед'} />;
          })}
        </Section>
        
        {/* РАСХОДЫ */}
      {(() => {
        // собираем строки ровно теми же Row, просто заранее в массив
        const expenseRows = [];
      
        if (nonZeroFixed.length > 0) {
          expenseRows.push({ type: 'sub', text: 'Постоянные/мес:' });
          nonZeroFixed.forEach(e => expenseRows.push({ type: 'row', label: e.name, value: formatCur(num(e.amount)) }));
        }
      
        if (nonZeroVar.length > 0) {
          expenseRows.push({ type: 'sub', text: 'Переменные:' });
          nonZeroVar.forEach(e => expenseRows.push({ type: 'row', label: e.name, value: num(e.percent) + '%' }));
        }
      
        if (nonZeroStartup.length > 0) {
          expenseRows.push({ type: 'sub', text: 'Стартовые:' });
          nonZeroStartup.forEach(e => expenseRows.push({ type: 'row', label: e.name, value: formatCur(num(e.amount)) }));
        }
      
        // итоговые строки всегда в конце
        const summaryRows = [
          { type: 'row', label: 'ИТОГО постоянные/мес', value: formatCur(results.totalFixed), bold: true, highlight: true },
          { type: 'row', label: 'ИТОГО переменные', value: (results.totalVarPercent * 100).toFixed(1) + '%', bold: true, highlight: true },
          { type: 'row', label: 'ИТОГО стартовые', value: formatCur(results.totalStartup), bold: true, highlight: true },
          { type: 'row', label: 'Окупаемость', value: results.paybackWeeks === Infinity ? '—' : results.paybackWeeks + ' нед', bold: true, highlight: true },
        ];
      
        const pages = chunk(expenseRows, EXP_ROWS_PER_PAGE);
      
        return (
          <>
            {pages.map((page, idx) => (
              <Section key={idx} title={idx === 0 ? 'РАСХОДЫ' : 'РАСХОДЫ (продолжение)'}>
                {page.map((it, i) => {
                  if (it.type === 'sub') {
                    return (
                      <div
                        key={`sub-${i}`}
                        style={{ padding: '6px 16px', fontWeight: 'bold', color: COLORS.primary, fontSize: 11, marginTop: i === 0 ? 0 : 5 }}
                      >
                        {it.text}
                      </div>
                    );
                  }
                  return (
                    <Row
                      key={`row-${i}`}
                      label={it.label}
                      value={it.value}
                      bold={it.bold}
                      highlight={it.highlight}
                    />
                  );
                })}
              </Section>
            ))}
      
            {/* Итоги всегда отдельным блоком в конце, чтобы не терялись */}
            <Section title="ИТОГИ ПО РАСХОДАМ">
              {summaryRows.map((it, i) => (
                <Row key={i} label={it.label} value={it.value} bold={it.bold} highlight={it.highlight} />
              ))}
            </Section>
          </>
        );
      })()}

        
        {/* ДОХОДЫ - всё в одной секции чтобы не разрывалось */}
        <div className="pdf-section" style={{ marginBottom: 12, backgroundColor: 'white' }}>
          <div style={{ backgroundColor: COLORS.primary, color: 'white', padding: '10px 16px', fontSize: 14, fontWeight: 'bold', marginBottom: 2 }}>ДОХОДЫ</div>
          
          {/* Консервативный */}
          <div style={{ backgroundColor: '#F97316', color: 'white', padding: '8px 16px', fontSize: 13, fontWeight: 'bold', marginTop: 10 }}>СЦЕНАРИЙ: КОНСЕРВАТИВНЫЙ</div>
          <Row label="Продаж ТР за год" value={Math.round(results.scenarios.conservative.totalTR)} />
          <Row label="Продаж ФЛ за год" value={results.scenarios.conservative.totalFL.toFixed(1)} />
          <Row label="Выручка за год" value={formatCur(results.scenarios.conservative.totalRev)} bold />
          <Row label="Чистая прибыль" value={formatCur(results.scenarios.conservative.yearProfit)} bold />
          
          {/* Реалистичный */}
          <div style={{ backgroundColor: COLORS.primary, color: 'white', padding: '8px 16px', fontSize: 13, fontWeight: 'bold', marginTop: 10 }}>СЦЕНАРИЙ: РЕАЛИСТИЧНЫЙ</div>
          <Row label="Продаж ТР за год" value={Math.round(results.scenarios.realistic.totalTR)} />
          <Row label="Продаж ФЛ за год" value={results.scenarios.realistic.totalFL.toFixed(1)} />
          <Row label="Выручка за год" value={formatCur(results.scenarios.realistic.totalRev)} bold />
          <Row label="Чистая прибыль" value={formatCur(results.scenarios.realistic.yearProfit)} bold />
          
          {/* Оптимистичный */}
          <div style={{ backgroundColor: '#22C55E', color: 'white', padding: '8px 16px', fontSize: 13, fontWeight: 'bold', marginTop: 10 }}>СЦЕНАРИЙ: ОПТИМИСТИЧНЫЙ</div>
          <Row label="Продаж ТР за год" value={Math.round(results.scenarios.optimistic.totalTR)} />
          <Row label="Продаж ФЛ за год" value={results.scenarios.optimistic.totalFL.toFixed(1)} />
          <Row label="Выручка за год" value={formatCur(results.scenarios.optimistic.totalRev)} bold />
          <Row label="Чистая прибыль" value={formatCur(results.scenarios.optimistic.yearProfit)} bold />
        </div>
        
        {/* Footer */}
        <div id="pdf-footer" style={{ marginTop: 40, paddingTop: 20, borderTop: `2px solid ${COLORS.primary}`, textAlign: 'center' }}>
          <div style={{ color: '#666', fontSize: 12, marginBottom: 5 }}>Рассчитано с помощью калькулятора Double Sales</div>
          <a href="https://julietsapova.com/" style={{ color: COLORS.primary, fontSize: 12, fontWeight: 'bold', textDecoration: 'none' }}>@julie_tsapova | julietsapova.com</a>
        </div>
      </div>
    );
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F0F7FC' }}>
      <header className="text-white py-6 px-4 shadow-xl" style={{ backgroundColor: COLORS.primary }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}><Rocket size={28} /></div>
            <div><h1 className="text-2xl md:text-3xl font-bold">DOUBLE SALES</h1><p className="text-sm" style={{ opacity: 0.8 }}>Калькулятор системы продаж</p></div>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-50 py-3 px-4 border-b shadow-sm" style={{ backgroundColor: '#F0F7FC', borderColor: COLORS.primary + '20' }}>
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto pb-2">
          <TabBtn id="main" activeTab={activeTab} setActiveTab={setActiveTab} icon={Calculator} label="Главная" />
          <TabBtn id="expenses" activeTab={activeTab} setActiveTab={setActiveTab} icon={PiggyBank} label="Расходы" />
          <TabBtn id="income" activeTab={activeTab} setActiveTab={setActiveTab} icon={TrendingUp} label="Доходы" />
          <TabBtn id="useful" activeTab={activeTab} setActiveTab={setActiveTab} icon={Lightbulb} label="Польза" />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">

        {activeTab === 'main' && (
          <div className="space-y-8">
            <section className="bg-white rounded-3xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>Ваши продукты</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input label="Цена трипваера" value={products.tripwirePrice} onChange={(v) => { setProducts({...products, tripwirePrice: v}); resetCalc(); }} suffix="₽" hint="Норма: 990-5000₽" />
                <Input label="Цена флагмана" value={products.flagshipPrice} onChange={(v) => { setProducts({...products, flagshipPrice: v}); resetCalc(); }} suffix="₽" hint="Норма: 50-300к₽" />
                <Input label="Допродажи" value={products.upsellPrice} onChange={(v) => { setProducts({...products, upsellPrice: v}); resetCalc(); }} suffix="₽" hint="Опционально" />
                <Input label="Мест на ФЛ/мес" value={products.maxFlagshipSales} onChange={(v) => { setProducts({...products, maxFlagshipSales: v}); resetCalc(); }} hint="999 = без лимита" />
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>Конверсии воронки</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input label="Контент → переход в бот" value={conversions.reelsToBot} onChange={(v) => { setConversions({...conversions, reelsToBot: v}); resetCalc(); }} suffix="%" hint="Норма: 1-3%" />
                <Input label="Бот → просмотр ЛМ" value={conversions.botToLM} onChange={(v) => { setConversions({...conversions, botToLM: v}); resetCalc(); }} suffix="%" hint="Норма: 60-80%" />
                <Input label="ЛМ → покупка ТР" value={conversions.lmToTR} onChange={(v) => { setConversions({...conversions, lmToTR: v}); resetCalc(); }} suffix="%" hint="Норма: 3-7%" />
                <Input label="ТР → заявка на ФЛ" value={conversions.trToApplication} onChange={(v) => { setConversions({...conversions, trToApplication: v}); resetCalc(); }} suffix="%" hint="Норма: 20-40%" />
                <Input label="Заявка → покупка ФЛ" value={conversions.applicationToFL} onChange={(v) => { setConversions({...conversions, applicationToFL: v}); resetCalc(); }} suffix="%" hint="Норма: 15-30%" />
                <Input label="ЛМ/Контент → заявка напрямую" value={conversions.lmToApplicationDirect} onChange={(v) => { setConversions({...conversions, lmToApplicationDirect: v}); resetCalc(); }} suffix="%" hint="0, если только через ТР" />
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>Ваши охваты</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Input label="Средний охват публикации" value={reach.avgReelsReach} onChange={(v) => { setReach({...reach, avgReelsReach: v}); resetCalc(); }} hint="Норма: см. бенчмарки" />
                <Input label="Публикаций в неделю" value={reach.reelsPerWeek} onChange={(v) => { setReach({...reach, reelsPerWeek: v}); resetCalc(); }} hint="Норма: 2-7" />
                <Input label="Рост охватов/мес" value={reach.monthlyGrowth} onChange={(v) => { setReach({...reach, monthlyGrowth: v}); resetCalc(); }} suffix="%" hint="Норма: 5-15%" />
              </div>
            </section>

            <CalculateButton onClick={calculate} calculated={calculated} />

            {calculated && results && (
              <>
                <section className="bg-white rounded-3xl p-6 shadow-xl">
                  <h2 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>Результаты</h2>
                  <div className="rounded-2xl p-5 mb-6" style={{ backgroundColor: COLORS.accent }}>
                    <h3 className="font-bold mb-4" style={{ color: COLORS.primary }}>Воронка в неделю</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      {[{ l: 'Охваты', v: results.weeklyReach }, { l: 'В бот', v: results.weeklyBotSubs }, { l: 'ЛМ', v: results.weeklyLMViews }, { l: 'ТР', v: results.weeklyTRSales }, { l: 'Заявок', v: results.weeklyApps }, { l: 'ФЛ', v: results.weeklyFLSales, hl: true }].map((item, idx) => (
                        <React.Fragment key={idx}>
                          {idx > 0 && <ChevronRight size={16} style={{ color: COLORS.primary + '40' }} />}
                          <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: item.hl ? COLORS.primary : 'white', color: item.hl ? 'white' : COLORS.primary }}>
                            <span style={{ opacity: 0.7 }}>{item.l}</span><span className="ml-2 font-bold">{formatNum(item.v)}</span>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ResultCard icon={DollarSign} label="Выручка/нед" value={formatCur(results.weeklyRevTotal)} sub={'ТР: ' + formatCur(results.weeklyRevTR)} />
                    <ResultCard icon={TrendingUp} label="Выручка/мес" value={formatCur(results.monthlyRev)} hl />
                    <ResultCard icon={Target} label="Прибыль/мес" value={formatCur(results.monthlyProfit)} sub="После расходов" />
                    <ResultCard icon={Sparkles} label="За год с ростом" value={formatCur(results.scenarios.realistic.totalRev)} sub={'Чистыми: ' + formatCur(results.scenarios.realistic.yearProfit)} />
                  </div>
                </section>

                <section className="bg-white rounded-3xl p-6 shadow-xl">
                  <h2 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>Сколько нужно для целей?</h2>
                  <div className="space-y-4">
                    <RoadmapRow goal="Первая продажа ТР" reachN={results.reachFirstTR} note="Минимум для первого результата" avgReach={results.r.avgReelsReach} reelsPerWeek={results.r.reelsPerWeek} />
                    <RoadmapRow goal="Первая продажа ФЛ" reachN={results.reachFirstFL} note="Если продажи идут без запуска" avgReach={results.r.avgReelsReach} reelsPerWeek={results.r.reelsPerWeek} />
                    <RoadmapRow goal="30 заявок на ФЛ" reachN={results.reach30Apps} note="Минимум для запуска" avgReach={results.r.avgReelsReach} reelsPerWeek={results.r.reelsPerWeek} />
                    <RoadmapRow goal="100 000 ₽" reachN={results.reach100k} note="Психологическая отметка" hl avgReach={results.r.avgReelsReach} reelsPerWeek={results.r.reelsPerWeek} />
                    <RoadmapRow goal="1 000 000 ₽" reachN={results.reach1M} note="Миллион — реально!" hl avgReach={results.r.avgReelsReach} reelsPerWeek={results.r.reelsPerWeek} />
                  </div>
                </section>

                <button onClick={generatePDF} disabled={generating} className="w-full py-3 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 border-2 hover:bg-gray-50 transition-all disabled:opacity-50" style={{ borderColor: COLORS.primary, color: COLORS.primary }}>
                  <Download size={20} /> {generating ? 'Создание PDF...' : 'Скачать PDF-отчёт'}
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="space-y-8">
            <section className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h2 className="text-xl font-bold" style={{ color: COLORS.primary }}>Постоянные/мес</h2>
                <button onClick={() => { setFixedExpenses([...fixedExpenses, { id: Date.now(), name: 'Новый расход', amount: '0', hint: '' }]); resetCalc(); }} className="flex items-center gap-2 px-4 py-2 text-white rounded-xl" style={{ backgroundColor: COLORS.primary }}><Plus size={18} />Добавить</button>
              </div>
              <div className="space-y-3">{fixedExpenses.map(e => <ExpenseRow key={e.id} expense={e} onUpdate={(id, f, v) => { setFixedExpenses(fixedExpenses.map(x => x.id === id ? {...x, [f]: v} : x)); resetCalc(); }} onRemove={(id) => { if(fixedExpenses.length > 1) setFixedExpenses(fixedExpenses.filter(x => x.id !== id)); resetCalc(); }} />)}</div>
            </section>

            <section className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h2 className="text-xl font-bold" style={{ color: COLORS.primary }}>Переменные (%)</h2>
                <button onClick={() => { setVariableExpenses([...variableExpenses, { id: Date.now(), name: 'Новый %', percent: '0', hint: '' }]); resetCalc(); }} className="flex items-center gap-2 px-4 py-2 text-white rounded-xl" style={{ backgroundColor: COLORS.primary }}><Plus size={18} />Добавить</button>
              </div>
              <div className="space-y-3">{variableExpenses.map(e => <ExpenseRow key={e.id} expense={e} isVar onUpdate={(id, f, v) => { setVariableExpenses(variableExpenses.map(x => x.id === id ? {...x, [f]: v} : x)); resetCalc(); }} onRemove={(id) => { if(variableExpenses.length > 1) setVariableExpenses(variableExpenses.filter(x => x.id !== id)); resetCalc(); }} />)}</div>
            </section>

            <section className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h2 className="text-xl font-bold" style={{ color: COLORS.primary }}>Стартовые</h2>
                <button onClick={() => { setStartupExpenses([...startupExpenses, { id: Date.now(), name: 'Новый расход', amount: '0', hint: '' }]); resetCalc(); }} className="flex items-center gap-2 px-4 py-2 text-white rounded-xl" style={{ backgroundColor: COLORS.primary }}><Plus size={18} />Добавить</button>
              </div>
              <div className="space-y-3">{startupExpenses.map(e => <ExpenseRow key={e.id} expense={e} onUpdate={(id, f, v) => { setStartupExpenses(startupExpenses.map(x => x.id === id ? {...x, [f]: v} : x)); resetCalc(); }} onRemove={(id) => { if(startupExpenses.length > 1) setStartupExpenses(startupExpenses.filter(x => x.id !== id)); resetCalc(); }} />)}</div>
            </section>

            <CalculateButton onClick={calculate} calculated={calculated} />

            {calculated && results && (
              <section className="rounded-3xl p-6 text-white" style={{ backgroundColor: COLORS.primary }}>
                <h2 className="text-xl font-bold mb-6">Итоги</h2>
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="rounded-2xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}><p className="text-sm" style={{ opacity: 0.8 }}>Постоянные/мес</p><p className="text-xl font-bold">{formatCur(results.totalFixed)}</p></div>
                  <div className="rounded-2xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}><p className="text-sm" style={{ opacity: 0.8 }}>Переменные</p><p className="text-xl font-bold">{(results.totalVarPercent * 100).toFixed(1)}%</p></div>
                  <div className="rounded-2xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}><p className="text-sm" style={{ opacity: 0.8 }}>Стартовые</p><p className="text-xl font-bold">{formatCur(results.totalStartup)}</p></div>
                  <div className="rounded-2xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}><p className="text-sm" style={{ opacity: 0.8 }}>Окупаемость</p><p className="text-xl font-bold">{results.paybackWeeks === Infinity ? '—' : results.paybackWeeks} нед</p></div>
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'income' && (
          <div className="space-y-8">
            {calculated && results ? (
              <>
                <div className="p-4 rounded-xl" style={{ backgroundColor: COLORS.accent }}>
                  <p className="text-sm" style={{ color: COLORS.primary }}><strong>Рост:</strong> охваты +{results.r.monthlyGrowth}%/мес. Старт: {formatNum(results.monthlyReachBase)} → год: {formatNum(results.monthlyReachBase * Math.pow(1 + results.r.monthlyGrowth/100, 11))}</p>
                </div>
                {[{ name: 'Сценарий: Консервативный', key: 'conservative', color: '#F97316' }, { name: 'Сценарий: Реалистичный', key: 'realistic', color: COLORS.primary }, { name: 'Сценарий: Оптимистичный', key: 'optimistic', color: '#22C55E' }].map((sc) => {
                  const data = results.scenarios[sc.key];
                  return (
                    <section key={sc.key} className="bg-white rounded-3xl shadow-xl overflow-hidden">
                      <div className="px-6 py-4 text-white" style={{ backgroundColor: sc.color }}><h2 className="text-xl font-bold">{sc.name}</h2></div>
                      <div className="p-6">
                        <div className="grid sm:grid-cols-4 gap-4 mb-6">
                          <div className="text-center p-4 rounded-xl" style={{ backgroundColor: COLORS.accent }}><p className="text-sm" style={{ color: COLORS.primary, opacity: 0.7 }}>ТР/год</p><p className="text-2xl font-bold" style={{ color: COLORS.primary }}>{formatNum(data.totalTR)}</p></div>
                          <div className="text-center p-4 rounded-xl" style={{ backgroundColor: COLORS.accent }}><p className="text-sm" style={{ color: COLORS.primary, opacity: 0.7 }}>ФЛ/год</p><p className="text-2xl font-bold" style={{ color: COLORS.primary }}>{data.totalFL.toFixed(1)}</p></div>
                          <div className="text-center p-4 rounded-xl" style={{ backgroundColor: COLORS.accent }}><p className="text-sm" style={{ color: COLORS.primary, opacity: 0.7 }}>Выручка</p><p className="text-2xl font-bold" style={{ color: COLORS.primary }}>{formatCur(data.totalRev)}</p></div>
                          <div className="text-center p-4 rounded-xl text-white" style={{ backgroundColor: sc.color }}><p className="text-sm" style={{ opacity: 0.9 }}>Чистыми</p><p className="text-2xl font-bold">{formatCur(data.yearProfit)}</p></div>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm"><thead><tr style={{ backgroundColor: COLORS.accent }}><th className="px-3 py-2 text-left" style={{ color: COLORS.primary }}>М</th><th className="px-3 py-2 text-right" style={{ color: COLORS.primary }}>Охваты</th><th className="px-3 py-2 text-right" style={{ color: COLORS.primary }}>Бот</th><th className="px-3 py-2 text-right" style={{ color: COLORS.primary }}>ТР</th><th className="px-3 py-2 text-right" style={{ color: COLORS.primary }}>Заявки</th><th className="px-3 py-2 text-right" style={{ color: COLORS.primary }}>ФЛ</th><th className="px-3 py-2 text-right" style={{ color: COLORS.primary }}>Выручка</th></tr></thead>
                            <tbody>
                              {data.months.map((row) => (<tr key={row.m} className="border-t" style={{ borderColor: COLORS.primary + '10' }}><td className="px-3 py-2" style={{ color: COLORS.primary }}>{row.m}</td><td className="px-3 py-2 text-right" style={{ color: COLORS.primary }}>{formatNum(row.reach)}</td><td className="px-3 py-2 text-right" style={{ color: COLORS.primary }}>{formatNum(row.bot)}</td><td className="px-3 py-2 text-right" style={{ color: COLORS.primary }}>{row.tr.toFixed(1)}</td><td className="px-3 py-2 text-right" style={{ color: COLORS.primary }}>{row.apps.toFixed(1)}</td><td className="px-3 py-2 text-right" style={{ color: COLORS.primary }}>{row.fl.toFixed(2)}</td><td className="px-3 py-2 text-right font-bold" style={{ color: COLORS.primary }}>{formatCur(row.rev)}</td></tr>))}
                              <tr style={{ backgroundColor: sc.color, color: 'white' }}><td className="px-3 py-2 font-bold">ГОД</td><td></td><td></td><td className="px-3 py-2 text-right font-bold">{formatNum(data.totalTR)}</td><td></td><td className="px-3 py-2 text-right font-bold">{data.totalFL.toFixed(1)}</td><td className="px-3 py-2 text-right font-bold">{formatCur(data.totalRev)}</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </section>
                  );
                })}
              </>
            ) : (
              <div className="bg-white rounded-3xl p-12 shadow-xl text-center">
                <p className="text-xl mb-6" style={{ color: COLORS.primary }}>Заполните данные на вкладке "Главная" и нажмите "Рассчитать"</p>
                <button onClick={() => setActiveTab('main')} className="px-6 py-3 rounded-xl text-white font-bold" style={{ backgroundColor: COLORS.primary }}>На главную</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'useful' && (
          <div className="space-y-8">
            <section className="bg-white rounded-3xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>Бенчмарки</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold mb-4" style={{ color: COLORS.primary }}>Конверсии</h3>
                  <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr style={{ backgroundColor: COLORS.primary, color: 'white' }}><th className="px-4 py-3 text-left">Этап</th><th className="px-4 py-3 text-center">Слабо</th><th className="px-4 py-3 text-center">Норма</th><th className="px-4 py-3 text-center">Отлично</th></tr></thead>
                    <tbody>{[{ s: 'Контент → бот', l: '< 1%', n: '1-2%', h: '> 3%' }, { s: 'Бот → ЛМ', l: '< 50%', n: '60-70%', h: '> 80%' }, { s: 'ЛМ → ТР', l: '< 2%', n: '3-5%', h: '> 7%' }, { s: 'ТР → заявка', l: '< 15%', n: '20-30%', h: '> 40%' }, { s: 'Заявка → ФЛ', l: '< 10%', n: '15-25%', h: '> 30%' }].map((r, i) => (<tr key={i} className="border-t" style={{ borderColor: COLORS.primary + '10' }}><td className="px-4 py-3" style={{ color: COLORS.primary }}>{r.s}</td><td className="px-4 py-3 text-center" style={{ color: '#DC2626' }}>{r.l}</td><td className="px-4 py-3 text-center" style={{ color: '#D97706' }}>{r.n}</td><td className="px-4 py-3 text-center" style={{ color: '#059669' }}>{r.h}</td></tr>))}</tbody>
                  </table></div>
                </div>
                <div>
                  <h3 className="font-bold mb-4" style={{ color: COLORS.primary }}>Цены</h3>
                  <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr style={{ backgroundColor: COLORS.primary, color: 'white' }}><th className="px-4 py-3 text-left">Продукт</th><th className="px-4 py-3 text-center">Новичок</th><th className="px-4 py-3 text-center">Средний</th><th className="px-4 py-3 text-center">Эксперт</th></tr></thead>
                    <tbody>{[{ p: 'Трипваер', n: '990-2к₽', m: '2-5к₽', e: '5-15к₽' }, { p: 'Флагман', n: '30-70к₽', m: '70-150к₽', e: '150-500к₽' }, { p: 'Премиум', n: '50-100к₽', m: '100-300к₽', e: '300к-1.5М₽' }].map((r, i) => (<tr key={i} className="border-t" style={{ borderColor: COLORS.primary + '10' }}><td className="px-4 py-3" style={{ color: COLORS.primary }}>{r.p}</td><td className="px-4 py-3 text-center" style={{ color: COLORS.primary }}>{r.n}</td><td className="px-4 py-3 text-center" style={{ color: COLORS.primary }}>{r.m}</td><td className="px-4 py-3 text-center" style={{ color: COLORS.primary }}>{r.e}</td></tr>))}</tbody>
                  </table></div>
                </div>
                <div>
                  <h3 className="font-bold mb-4" style={{ color: COLORS.primary }}>Охваты публикаций</h3>
                  <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr style={{ backgroundColor: COLORS.primary, color: 'white' }}><th className="px-4 py-3 text-left">Аккаунт</th><th className="px-4 py-3 text-center">Медиана</th><th className="px-4 py-3 text-center">Хорошо</th><th className="px-4 py-3 text-center">Вирусный</th></tr></thead>
                    <tbody>{[{ s: '< 1к', m: '200-500', g: '1к+', v: '5к+' }, { s: '1-5к', m: '500-1.5к', g: '3к+', v: '10к+' }, { s: '5-20к', m: '1.5-5к', g: '10к+', v: '50к+' }, { s: '20-100к', m: '5-20к', g: '30к+', v: '100к+' }].map((r, i) => (<tr key={i} className="border-t" style={{ borderColor: COLORS.primary + '10' }}><td className="px-4 py-3" style={{ color: COLORS.primary }}>{r.s}</td><td className="px-4 py-3 text-center" style={{ color: COLORS.primary }}>{r.m}</td><td className="px-4 py-3 text-center" style={{ color: '#059669' }}>{r.g}</td><td className="px-4 py-3 text-center" style={{ color: '#2563EB' }}>{r.v}</td></tr>))}</tbody>
                  </table></div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-6" style={{ color: COLORS.primary }}>План запуска системы (12 недель)</h2>
              <div className="space-y-3">
                {[
                  { w: '1', f: 'Стратегия', t: 'Продуктовая линейка + воронка' },
                  { w: '2', f: 'Создание ЛМ', t: 'Бесплатный продукт для привлечения' },
                  { w: '3', f: 'Создание ТР', t: 'Недорогой мини-продукт' },
                  { w: '4', f: 'Техническая часть', t: 'Бот, платформа, оплата' },
                  { w: '5-6', f: 'Контент', t: 'Привлечение людей в воронку' },
                  { w: '7-8', f: 'Заявки', t: 'Сбор 20-30 заявок' },
                  { w: '9-10', f: 'Предзапуск', t: 'Прогрев, подготовка флагмана и окна продаж' },
                  { w: '11-12', f: 'ЗАПУСК!', t: 'Продажи флагмана', hl: true }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: item.hl ? COLORS.primary : COLORS.accent, color: item.hl ? 'white' : COLORS.primary }}>
                    <div className="w-16 text-center py-2 rounded-lg font-bold text-sm text-white" style={{ backgroundColor: item.hl ? 'rgba(255,255,255,0.2)' : COLORS.primary }}>{item.w}</div>
                    <div className="flex-1"><p className="font-bold">{item.f}</p><p className="text-sm" style={{ opacity: 0.8 }}>{item.t}</p></div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl p-6 text-white" style={{ backgroundColor: COLORS.primary }}>
              <h2 className="text-xl font-bold mb-6">Советы</h2>
              <div className="space-y-3">
                {[
                  'Подключайте сервисы по мере необходимости. Ищите бесплатные альтернативы и пробные периоды',
                  'Делайте все сами по инструкциям из интернета. Начинайте нанимать команду после 50к₽',
                  'Не стройте сразу инфо-империю, начинайте с малого. Быстрее начнете - быстрее заработаете',
                  'Придерживайтесь стратегии Double Sales: 3 продукта + автоворонка + живой запуск',
                  'Не бойтесь продавать лично тем, кто оставил заявку',
                  'До 2.4М/год выбирайте самозанятость',
                  'Не старайтесь сделать идеальный контент',
                  'Пока клиентов мало, давайте им рассрочки без банков'
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>{idx + 1}</span>
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="py-6 px-4 mt-12 text-white" style={{ backgroundColor: COLORS.primary }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-2xl font-bold">DOUBLE SALES</p>
          <p className="text-sm mt-2" style={{ opacity: 0.6 }}>@julie_tsapova</p>
        </div>
      </footer>

      {/* Hidden PDF Template */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <PDFReport 
          ref={pdfRef}
          results={results}
          fixedExpenses={fixedExpenses}
          variableExpenses={variableExpenses}
          startupExpenses={startupExpenses}
        />
      </div>
    </div>
  );
};

export default DoubleSalesCalculator;
