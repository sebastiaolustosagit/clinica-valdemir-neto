# Layout Specification — Clinica Valdemir Neto

## Identidade Visual Global

- **Font Heading:** DM Serif Display (400, 400 italic)
- **Font Body:** DM Sans (400, 500, 700)
- **Paleta:**
  - Background principal: #0B1121
  - Background elevado: #111B2E
  - Texto: #F8F8F8
  - Texto muted: #8A94A6
  - Accent/Primary: #C8A461
  - Accent hover: #D4B77A
  - Border: #1E2A3F
  - Error: #ef4444
  - Success: #10b981
- **Container max:** 1200px
- **Container padding:** clamp(1.25rem, 5vw, 2rem)
- **Section padding vertical:** clamp(4rem, 10vw, 8rem)
- **Regra de animacao:** Hero SEM animacao de entrada. Demais secoes usam AOS com `disableMutationObserver: true`, `duration: 800`, `once: true`, `offset: 50`, `easing: ease-out-cubic`
- **Touch targets:** Todos os elementos clicaveis devem ter min-height 48px e min-width 48px em mobile para conformidade com WCAG/mobile usability

---

## Otimizacoes Mobile (aplicar em toda a pagina)

### Botao Flutuante WhatsApp (Mobile + Desktop)
- Position: fixed, bottom 1.5rem, right 1.5rem, z-index 999
- Width: 56px, height: 56px, border-radius: 50%
- Background: #25D366 (verde WhatsApp oficial)
- Box-shadow: 0 4px 16px rgba(0,0,0,0.3)
- Display: flex, align-items center, justify-content center
- Icone: SVG WhatsApp branco (#FFFFFF), 28x28px
- Link: `https://wa.me/5586994263194?text=Ola!%20Gostaria%20de%20agendar%20uma%20avaliacao%20com%20o%20Dr.%20Valdemir%20Neto.`
- aria-label: "Fale conosco pelo WhatsApp"
- Hover (desktop): scale(1.1), box-shadow 0 6px 20px rgba(37,211,102,0.4), transition 0.3s ease
- Animacao sutil: @keyframes fabPulse — box-shadow 0 4px 16px rgba(0,0,0,0.3) → box-shadow 0 4px 16px rgba(37,211,102,0.5), 3s ease-in-out infinite (chama atencao sem irritar)
- Escondido quando CTA do hero esta visivel (via IntersectionObserver no hero CTA — adicionar classe .is-hidden com opacity 0, pointer-events none, transition 0.3s)
- Aparece apos hero sair do viewport

### Touch Targets Globais
- Todos os botoes/CTAs: min-height 48px, min-width 48px
- Hero CTA: padding aumentado em mobile para 1.125rem 2.5rem (garante 48px+)
- CTA Final: idem
- FAQ items: padding 1.5rem 0 garante area de toque ampla (manter)
- Accordion pergunta: padding ajustado para min 48px de altura clicavel
- Links no footer: se houver, garantir 48px

### Performance Mobile
- Carousel de depoimentos: usar IntersectionObserver para pausar `animation-play-state: paused` quando fora do viewport (economiza CPU/bateria)
- Mouse parallax: ja desativado em <1024px (correto)
- Float animations (secao 5): ja desativadas em <768px (correto)
- Linha draw SVG (secao 6): simplificar para CSS transition simples em mobile (sem JS de scroll)
- Imagens futuras: `loading="lazy"` em tudo exceto hero, width/height explicitos

### Hero Mobile Aprimorado
- Em mobile (<768px), apos o CTA adicionar microcopy de confianca:
  - Texto: "Atendimento exclusivo na Zona Leste"
  - DM Sans, 0.75rem, cor #8A94A6, margin-top 1rem
  - Isso reafirma localizacao premium e preenche o espaco liberado pelo visual oculto

---

## Secao 1: Hero

### Arquetipo e Constraints
- Arquetipo: Split Assimetrico (60/40)
- Constraints: Headline >150px (Tipografia), Dark Mode (Cor), Hover Lift (Interacao)
- Justificativa: O split assimetrico da peso ao texto (lado dominante) enquanto o visual decorativo a direita adiciona sofisticacao sem competir com a mensagem. Headline gigante cria impacto imediato. Dark mode transmite premium e confianca medica.

### Conteudo
- Tag: "Zona Leste de Teresina"
- Headline: "Seu sorriso novo / em tempo recorde" (segunda linha em italico dourado)
- Subheadline: "Dr. Valdemir Neto e uma tecnica exclusiva de reabilitacao oral que devolve sua confianca com velocidade, precisao e resultado natural."
- CTA: "Agende sua avaliacao" (link WhatsApp: 5586994263194)

### Layout
- Secao: min-height 100vh (100dvh), display flex, align-items center, overflow hidden
- Inner: CSS Grid, 1 coluna em mobile, `grid-template-columns: 60% 40%` a partir de 768px
- Gap: 3rem
- Content padding mobile: clamp(6rem, 15vh, 10rem) top, clamp(3rem, 8vh, 6rem) bottom
- Content padding desktop (768px+): 0

### Tipografia
- Tag: DM Sans, 0.8125rem, weight 500, letter-spacing 0.15em, uppercase, cor #C8A461
  - Pseudo-element ::before: linha horizontal 1.25rem x 1px, cor #C8A461, a esquerda com padding-left 2rem
- Headline: DM Serif Display, clamp(2.75rem, 8vw, 5.5rem) mobile, clamp(4.5rem, 9.5vw, 10rem) em 1024px+
  - line-height: 1.05, letter-spacing: -0.02em, cor #F8F8F8
  - `<em>`: font-style italic, cor #C8A461
  - margin-bottom: 1.5rem
- Subheadline: DM Sans, clamp(1rem, 1.5vw, 1.25rem), line-height 1.7, cor #8A94A6, max-width 480px, margin-bottom 2.5rem

### Cores
- Background: #0B1121
- Texto headline: #F8F8F8
- Texto headline italico: #C8A461
- Tag: #C8A461
- Subheadline: #8A94A6
- CTA background: #C8A461
- CTA texto: #0B1121
- CTA hover background: #D4B77A

### Elementos Visuais
- Lado direito (display none em mobile, block em 768px+):
  - Circulo decorativo: position absolute, centrado, width/height clamp(250px, 22vw, 380px), border-radius 50%, radial-gradient(circle at 30% 30%, rgba(200,164,97,0.15), rgba(200,164,97,0.03))
  - Linha vertical: position absolute, top 20%, right 15%, width 1px, height 40%, linear-gradient(to bottom, transparent, #C8A461, transparent), opacity 0.3
  - Ponto dourado: position absolute, bottom 25%, left 30%, 6x6px, border-radius 50%, background #C8A461, opacity 0.5

### Animacoes
- SEM animacao de entrada (hero aparece instantaneamente)
- Pos-carregamento:
  - Circulo: `heroBreath` — scale(1) → scale(1.05) → scale(1), 6s ease-in-out infinite
  - Linha: `heroLineFloat` — translateY(0) → translateY(-15px) → translateY(0), 8s ease-in-out infinite
  - Ponto: `heroDotPulse` — opacity 0.5/scale(1) → opacity 0.8/scale(1.3), 4s ease-in-out infinite

### Interatividade
- CTA hover: translateY(-3px), background #D4B77A, box-shadow 0 8px 30px rgba(200,164,97,0.25), transition 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)
- CTA active: translateY(-1px)

### Responsividade
- Mobile (<768px): 1 coluna, visual decorativo hidden, padding top/bottom ajustado
- Tablet (768px+): Grid 60/40, visual aparece
- Desktop (1024px+): Headline escala para clamp(4.5rem, 9.5vw, 10rem)

---

## Secao 2: O Problema

### Arquetipo e Constraints
- Arquetipo: Progressive Reveal (Single Focus)
- Constraints: Stagger (Movimento), Container Narrow (Layout)
- Justificativa: Container estreito foca a atencao. Stagger revela cada dor sequencialmente, criando empatia crescente. O ritmo de revelacao imita a experiencia do paciente — problema apos problema.

### Conteudo
- Eyebrow: "Voce se identifica?"
- Titulo: "Voce merece mais do que esperar meses por um sorriso"
- Items:
  1. "Tratamentos longos que parecem nunca terminar"
  2. "Proteses provisorias que incomodam e constrangem"
  3. "Medo de sorrir em publico ou evitar fotos"
  4. "A sensacao de que recuperar seus dentes vai ser complicado e demorado"
- Fechamento: "Se voce vive alguma dessas situacoes, existe uma solucao mais rapida do que imagina."

### Layout
- Background: #111B2E
- Container: max-width 720px, centralizado, padding horizontal var(--container-px)
- Section padding: var(--section-py)

### Tipografia
- Eyebrow: DM Sans, 0.8125rem, weight 500, letter-spacing 0.15em, uppercase, cor #C8A461, margin-bottom 1rem
- Titulo: DM Serif Display, clamp(1.75rem, 4vw, 2.75rem), cor #F8F8F8, margin-bottom 3rem, max-width 600px
- Items: DM Sans, clamp(1rem, 1.5vw, 1.125rem), line-height 1.6, cor #8A94A6
  - Marker: 8x8px, border-radius 50%, background #C8A461, opacity 0.6, margin-top 0.5rem, flex-shrink 0
  - Gap entre marker e texto: 1rem
- Fechamento: DM Serif Display, clamp(1.25rem, 2.5vw, 1.5rem), line-height 1.5, cor #F8F8F8
  - Border-left: 2px solid #C8A461, padding-left 1.5rem

### Cores
- Background secao: #111B2E
- Eyebrow: #C8A461
- Titulo: #F8F8F8
- Items texto: #8A94A6
- Markers: #C8A461 a 60% opacidade
- Fechamento: #F8F8F8
- Fechamento borda: #C8A461

### Animacoes
- Eyebrow: data-aos="fade-up"
- Titulo: data-aos="fade-up", delay 100ms
- Items: data-aos="fade-up", delays stagger 150ms, 200ms, 250ms, 300ms
- Fechamento: data-aos="fade-up", delay 350ms

### Responsividade
- Totalmente fluido, container max 720px garante legibilidade em todos os breakpoints

---

## Secao 3: A Solucao

### Arquetipo e Constraints
- Arquetipo: Split Vertical com Overlap
- Constraints: Texto com Gradiente (Tipografia), Sticky Element (Layout)
- Justificativa: Split cria contraste dramático entre o visual (imagem placeholder ou elemento grafico de dente/sorriso) e o texto. Texto com gradiente dourado no titulo destaca a solucao como premium. Sticky element no titulo mantém o contexto enquanto o usuario le o conteudo.

### Conteudo
- Titulo: "Reabilitacao oral com velocidade que so o Dr. Valdemir entrega"
- Paragrafo 1: "O Dr. Valdemir Neto desenvolveu uma tecnica propria de protese rapida que reduz drasticamente o tempo entre a consulta e o resultado final. Enquanto outros profissionais levam semanas, aqui voce sai com seu sorriso em uma fracao do tempo."
- Paragrafo 2: "Isso nao e pressa. E dominio tecnico. Sao anos de especializacao em implantodontia e reabilitacao oral traduzidos em um processo mais inteligente e eficiente."

### Layout
- Background: #0B1121
- Container: max-width 1200px
- Grid: 1 coluna em mobile; `grid-template-columns: 45% 55%` em 768px+
- Gap: clamp(2rem, 5vw, 4rem)
- Lado esquerdo: elemento visual/decorativo (bloco com borda dourada e gradiente sutil, representando excelencia)
  - Width 100%, aspect-ratio 4/3, background linear-gradient(135deg, #111B2E 0%, #1A2540 100%), border 1px solid rgba(200,164,97,0.2), border-radius 4px
  - Dentro: texto "VN" em DM Serif Display, font-size clamp(5rem, 10vw, 8rem), cor rgba(200,164,97,0.08), centrado absoluto (representacao abstrata da marca)
- Lado direito: conteudo textual

### Tipografia
- Titulo: DM Serif Display, clamp(1.75rem, 3.5vw, 2.5rem), line-height 1.15, margin-bottom 2rem
  - Gradiente no texto: background linear-gradient(135deg, #F8F8F8 0%, #C8A461 100%), -webkit-background-clip text, -webkit-text-fill-color transparent
- Paragrafo 1: DM Sans, clamp(1rem, 1.5vw, 1.125rem), line-height 1.8, cor #8A94A6, margin-bottom 1.5rem
- Paragrafo 2: DM Sans, clamp(1rem, 1.5vw, 1.125rem), line-height 1.8, cor #F8F8F8, font-weight 500
  - Este paragrafo diferencia-se do anterior pela cor mais clara e peso maior — enfatiza a mensagem-chave "nao e pressa, e dominio tecnico"

### Cores
- Background: #0B1121
- Visual box background: linear-gradient(135deg, #111B2E, #1A2540)
- Visual box borda: rgba(200,164,97,0.2)
- Visual box texto "VN": rgba(200,164,97,0.08)
- Titulo: gradiente #F8F8F8 → #C8A461
- Paragrafo 1: #8A94A6
- Paragrafo 2: #F8F8F8

### Animacoes
- Visual box: data-aos="fade-right", duration 800
- Titulo: data-aos="fade-up", delay 100
- Paragrafo 1: data-aos="fade-up", delay 200
- Paragrafo 2: data-aos="fade-up", delay 300

### Interatividade
- Em desktop (768px+), o lado esquerdo (visual) usa position sticky, top 50%, transform translateY(-50%) enquanto o conteudo rola. Na implementacao, aplicar sticky apenas se o conteudo do lado direito for mais alto que o visual.

### Responsividade
- Mobile (<768px): 1 coluna, visual empilhado acima do texto, aspect-ratio 16/9, sticky desativado
- Desktop (768px+): Grid 45/55, sticky no visual

---

## Secao 4: Especialidades

### Arquetipo e Constraints
- Arquetipo: Bento Box (celulas de tamanhos variados)
- Constraints: Hover Reveal (Interacao), Selective Color (Cor)
- Justificativa: Bento box evita o "3 cards lado a lado" proibido. Celulas de tamanhos diferentes criam hierarquia visual — implantes e estetica (carros-chefe) ganham celulas maiores. Hover reveal mostra mais detalhes sobre cada especialidade. Selective color: dourado destaca os carros-chefe, resto neutro.

### Conteudo
- Eyebrow: "Especialidades"
- Titulo: "Tratamento completo em um so lugar"
- Cards (6 especialidades):
  1. **Implantes dentarios** (DESTAQUE - celula grande) — "Solucao definitiva para dentes perdidos. Tecnicas modernas com recuperacao rapida e resultado natural."
  2. **Reabilitacao oral completa** (DESTAQUE - celula grande) — "Protocolos avancados para quem precisa reconstruir a funcao e a estetica de toda a arcada."
  3. **Protese com velocidade** (DESTAQUE - celula media) — "A tecnica que diferencia o Dr. Valdemir. Menos tempo de espera, mais previsibilidade no resultado."
  4. **Estetica dental** — "Lentes de contato dental, clareamento e harmonizacao para quem quer elevar o sorriso ao proximo nivel."
  5. **Ortodontia** — "Alinhadores e aparelhos esteticos para correcao de mordida e alinhamento dos dentes."
  6. **Periodontia** — "Cuidado com gengivas e estruturas de suporte. Base essencial para implantes e longevidade dos dentes."

### Layout
- Background: #111B2E
- Container: max-width 1200px
- Header: eyebrow + titulo centrados, margin-bottom clamp(3rem, 6vw, 4rem)
- Grid Bento: CSS Grid
  - Mobile (<768px): 1 coluna
  - Tablet (768px): 2 colunas
  - Desktop (1024px+): 3 colunas, 2 rows
    - Row 1: Implantes (span 2 col), Reabilitacao (span 1 col)
    - Row 2: Protese (span 1 col), Estetica (span 1 col), Ortodontia (span 1 col)
    - Row 3 (desktop): Periodontia (span 3 col, mas com max-width interno de 400px, alinhado a esquerda)
  - Gap: clamp(0.75rem, 1.5vw, 1rem)

### Card individual
- Background: #0B1121
- Border: 1px solid #1E2A3F
- Border-radius: 4px
- Padding: clamp(1.5rem, 3vw, 2.5rem)
- Min-height: 200px (cards normais), 240px (cards destaque)
- Display: flex, flex-direction column, justify-content flex-end
- Transicao hover: border-color muda para rgba(200,164,97,0.3), 0.3s ease

### Tipografia
- Eyebrow: DM Sans, 0.8125rem, weight 500, letter-spacing 0.15em, uppercase, cor #C8A461
- Titulo secao: DM Serif Display, clamp(1.75rem, 4vw, 2.75rem), cor #F8F8F8, text-align center
- Card titulo: DM Serif Display, clamp(1.25rem, 2vw, 1.5rem), cor #F8F8F8, margin-bottom 0.75rem
  - Cards destaque (Implantes, Reabilitacao, Protese): cor #C8A461 (selective color)
- Card descricao: DM Sans, 0.9375rem, line-height 1.6, cor #8A94A6
  - Descricao comeca com max-height 0, opacity 0, overflow hidden
  - No hover: max-height 200px, opacity 1, transition max-height 0.4s ease, opacity 0.3s ease 0.1s

### Cores
- Background secao: #111B2E
- Card bg: #0B1121
- Card border: #1E2A3F
- Card border hover: rgba(200,164,97,0.3)
- Card titulo normal: #F8F8F8
- Card titulo destaque: #C8A461
- Card descricao: #8A94A6
- Numero/indice no card (top-right): DM Sans, 0.75rem, cor rgba(200,164,97,0.2)

### Elementos Visuais
- Cada card tem um numero sutil no canto superior direito (01, 02, 03...), position absolute, top 1.5rem, right 1.5rem, DM Sans, 0.75rem, cor rgba(200,164,97,0.2)
- Cards destaque tem uma linha fina dourada no topo: pseudo-element ::before, height 2px, width 40px, background #C8A461, top 0, left padding

### Animacoes
- Eyebrow + titulo: data-aos="fade-up"
- Cards: data-aos="fade-up", stagger delays — 0, 100, 150, 200, 250, 300ms
- Hover reveal nas descricoes: max-height 0 → max-height 200px, 0.4s ease + opacity 0 → 1, 0.3s ease 0.1s

### Interatividade
- Hover no card: border-color rgba(200,164,97,0.3), descricao revela
- Mobile: descricoes sempre visiveis (sem hover, max-height auto, opacity 1)
- Cards destaque: descricoes sempre visiveis em todos os breakpoints

### Responsividade
- Mobile (<768px): 1 coluna, todas descricoes visiveis, min-height auto
- Tablet (768px): 2 colunas, implantes span 2
- Desktop (1024px+): 3 colunas com layout bento descrito acima

---

## Secao 5: Por que a Clinica Valdemir Neto

### Arquetipo e Constraints
- Arquetipo: Floating Cards (elementos que parecem flutuar)
- Constraints: Glassmorphism (Efeitos Especiais), Mouse Parallax (Interacao)
- Justificativa: Cards flutuantes com glassmorphism criam sensacao de profundidade e premium. Mouse parallax adiciona interatividade sofisticada. Contrasta com o bento box da secao anterior.

### Conteudo
- Titulo: "Uma clinica pensada para quem nao aceita menos que o melhor"
- 4 blocos:
  1. **Tecnica exclusiva** — "Protese em tempo recorde. Voce nao encontra esse nivel de agilidade em outro lugar de Teresina."
  2. **Especialista dedicado** — "Dr. Valdemir Neto e referencia em implantes e reabilitacao oral. Cada caso recebe atencao personalizada."
  3. **Estrutura premium** — "Ambiente moderno, equipamentos de ultima geracao e conforto que voce percebe desde a recepcao."
  4. **Localizacao privilegiada** — "Na Zona Leste de Teresina, o coracao do bairro mais nobre da cidade. Facil acesso e estacionamento."

### Layout
- Background: #0B1121
- Container: max-width 1200px
- Titulo: alinhado a esquerda, max-width 600px, margin-bottom clamp(3rem, 6vw, 5rem)
- Cards container: display grid
  - Mobile: 1 coluna
  - Tablet (768px): 2 colunas
  - Desktop: 2 colunas, gap clamp(1.5rem, 3vw, 2rem)
- Cards tem posicionamento levemente deslocado para criar efeito "flutuante":
  - Card 1: transform translateY(0)
  - Card 2: transform translateY(20px)
  - Card 3: transform translateY(-10px)
  - Card 4: transform translateY(30px)

### Card individual
- Background: rgba(17, 27, 46, 0.6) (glassmorphism base)
- Backdrop-filter: blur(20px)
- -webkit-backdrop-filter: blur(20px)
- Border: 1px solid rgba(200, 164, 97, 0.1)
- Border-radius: 8px
- Padding: clamp(2rem, 4vw, 3rem)

### Tipografia
- Titulo secao: DM Serif Display, clamp(1.75rem, 4vw, 2.75rem), cor #F8F8F8, line-height 1.15
- Card titulo: DM Sans, 1.125rem, weight 700, cor #C8A461, margin-bottom 0.75rem, letter-spacing 0.02em
- Card texto: DM Sans, 0.9375rem, line-height 1.7, cor #8A94A6

### Cores
- Background secao: #0B1121
- Cards bg: rgba(17, 27, 46, 0.6)
- Cards border: rgba(200, 164, 97, 0.1)
- Cards border hover: rgba(200, 164, 97, 0.25)
- Card titulo: #C8A461
- Card texto: #8A94A6

### Elementos Visuais
- Background sutil: dois circulos decorativos fora de foco (position absolute, z-index 0)
  - Circulo 1: top 10%, left -5%, 300x300px, radial-gradient(circle, rgba(200,164,97,0.06), transparent), border-radius 50%
  - Circulo 2: bottom 10%, right -5%, 250x250px, radial-gradient(circle, rgba(200,164,97,0.04), transparent), border-radius 50%
- Cards ficam em z-index 1

### Animacoes
- Titulo: data-aos="fade-up"
- Cards: data-aos="fade-up", delays stagger 0, 100, 200, 300ms
- Float loop sutil nos cards (apenas desktop):
  - Cards impares: @keyframes subtleFloat — translateY(0) → translateY(-6px) → translateY(0), 7s ease-in-out infinite
  - Cards pares: @keyframes subtleFloat2 — translateY(0) → translateY(-4px) → translateY(0), 9s ease-in-out infinite 1s

### Interatividade
- Mouse parallax (apenas desktop 1024px+): cards movem levemente na direcao oposta ao mouse
  - Implementacao via JS: addEventListener mousemove no container, calcular posicao relativa, aplicar transform translate(x * -0.01, y * -0.01) com requestAnimationFrame
  - Fator de movimento: cards 1 e 4 = 10px max, cards 2 e 3 = 6px max
  - Transicao suave: transition transform 0.3s ease-out
- Hover no card: border-color rgba(200,164,97,0.25), transition 0.3s ease

### Responsividade
- Mobile (<768px): 1 coluna, sem translateY offset, sem float animation, sem mouse parallax
- Tablet (768px): 2 colunas, translateY offsets aplicados, sem mouse parallax
- Desktop (1024px+): 2 colunas, offsets + float + mouse parallax

---

## Secao 6: Como Funciona

### Arquetipo e Constraints
- Arquetipo: Scroll Storytelling (narrativa com scroll)
- Constraints: Counter Animation (Movimento), Draw SVG (Movimento)
- Justificativa: 3 passos contados como historia que se revela. A linha vertical conectando os passos e desenhada conforme o scroll. Numeros gigantes animados criam impacto. Contrasta completamente com os floating cards anteriores.

### Conteudo
- Eyebrow: "Como funciona"
- Titulo: "Do primeiro contato ao sorriso novo em 3 passos"
- Passo 1: titulo "Avaliacao personalizada", texto "Exame clinico detalhado, radiografias e planejamento digital do seu caso. Voce entende exatamente o que sera feito, quanto tempo leva e quanto custa. Sem surpresas."
- Passo 2: titulo "Tratamento com agilidade", texto "Execucao do plano com a tecnica de protese rapida do Dr. Valdemir. Menos sessoes, menos desconforto, menos tempo fora da sua rotina."
- Passo 3: titulo "Resultado e acompanhamento", texto "Sorriso entregue com qualidade que dura. Acompanhamento pos-tratamento para garantir sua satisfacao e saude bucal a longo prazo."

### Layout
- Background: #111B2E
- Container: max-width 900px (estreito para storytelling)
- Header: eyebrow + titulo centrados, margin-bottom clamp(3rem, 7vw, 5rem)
- Steps container: display flex, flex-direction column, position relative
- Linha conectora vertical: position absolute, left 28px (mobile) / left 50px (desktop), top 0, bottom 0, width 1px, background linear-gradient(to bottom, transparent, #C8A461, #C8A461, transparent)
  - A linha usa um pseudo-element com clip-path que se expande com scroll para efeito "draw"
- Cada step: display flex, gap clamp(1.5rem, 3vw, 2.5rem), margin-bottom clamp(3rem, 6vw, 4rem), position relative

### Step individual
- Numero: flex-shrink 0, width 56px (mobile) / 100px (desktop), height 56px/100px
  - Display flex, align-items center, justify-content center
  - Background: transparent
  - Border: 1px solid rgba(200,164,97,0.3)
  - Border-radius: 50%
  - DM Serif Display, font-size 1.25rem (mobile) / 2rem (desktop), cor #C8A461
  - Quando visivel: counter animation — numero aparece contando de 0 ate o valor (1, 2 ou 3)
- Conteudo: flex 1
  - Titulo: DM Serif Display, clamp(1.25rem, 2.5vw, 1.75rem), cor #F8F8F8, margin-bottom 0.75rem
  - Texto: DM Sans, clamp(0.9375rem, 1.5vw, 1.0625rem), line-height 1.7, cor #8A94A6

### Cores
- Background secao: #111B2E
- Linha conectora: #C8A461 (gradiente com transparencia nas pontas)
- Numero borda: rgba(200,164,97,0.3)
- Numero texto: #C8A461
- Step titulo: #F8F8F8
- Step texto: #8A94A6

### Animacoes
- Header: data-aos="fade-up"
- Step 1: data-aos="fade-up", delay 0
- Step 2: data-aos="fade-up", delay 150
- Step 3: data-aos="fade-up", delay 300
- Linha conectora: CSS animation via scroll — clip-path inset(0 0 100% 0) → inset(0 0 0% 0), usando IntersectionObserver para ativar quando secao entra no viewport
  - Implementacao simplificada: usar transition clip-path 1.5s ease quando secao ganha classe .is-visible
- Counter nos numeros: JS simples — quando step fica visivel (IntersectionObserver), animar textContent de 0 ao numero final em 600ms com easeOutQuad

### Interatividade
- Numeros no hover: scale(1.05), border-color #C8A461, transition 0.3s ease
- Sem interacoes pesadas — esta secao e contemplativa

### Responsividade
- Mobile (<768px): numeros 56x56px, linha left 28px, gap 1.5rem
- Desktop (768px+): numeros 100x100px, linha left 50px, gap 2.5rem

---

## Secao 7: Depoimentos

### Arquetipo e Constraints
- Arquetipo: Carousel Infinite
- Constraints: Hover Lift (Interacao), Noise Texture (Efeitos Especiais)
- Justificativa: Carousel horizontal infinito cria movimento continuo que sugere volume de pacientes satisfeitos. Diferente de cards estaticos (proibido: depoimentos com foto circular + texto). Noise texture adiciona textura visual sofisticada ao background dos cards.

### Conteudo
- Eyebrow: "O que dizem nossos pacientes"
- 3 depoimentos (placeholders — substituir por reais):
  1. "Eu tinha vergonha de sorrir ha anos. Em poucas semanas o Dr. Valdemir resolveu o que eu achava que ia demorar meses. Mudou minha vida." — Paciente 1
  2. "A estrutura da clinica e impressionante. Voce sente que esta em boas maos desde o momento que entra. Fiz meus implantes e nao poderia estar mais satisfeito." — Paciente 2
  3. "Procurei varios dentistas antes e nenhum me passou a mesma seguranca. O Dr. Valdemir explica tudo, e rapido e o resultado ficou perfeito." — Paciente 3

### Layout
- Background: #0B1121
- Eyebrow: centrado, margin-bottom clamp(2rem, 4vw, 3rem)
- Carousel: overflow hidden, width 100vw (full bleed, posicao relative a esquerda da margem do container)
- Track: display flex, gap 1.5rem, animation autoScroll linear infinite
  - Duplicar os 3 cards (total 6 no DOM) para efeito de loop infinito
  - Animation duration: 30s
  - Direction: normal (esquerda para direita)
  - Pausa no hover do track: animation-play-state paused
- Cada card: flex-shrink 0, width clamp(300px, 40vw, 420px)

### Card individual
- Background: #111B2E
- Background-image: sutil noise texture via SVG inline (url("data:image/svg+xml,...")) com opacity 0.03
- Border: 1px solid #1E2A3F
- Border-radius: 4px
- Padding: clamp(2rem, 3vw, 2.5rem)
- Display: flex, flex-direction column, justify-content space-between, min-height 220px

### Tipografia
- Eyebrow: DM Sans, 0.8125rem, weight 500, letter-spacing 0.15em, uppercase, cor #C8A461, text-align center
- Depoimento texto: DM Serif Display, clamp(1rem, 1.5vw, 1.125rem), font-style italic, line-height 1.7, cor #F8F8F8, margin-bottom 1.5rem
  - Abre com aspas decorativas: pseudo-element ::before, content '"', DM Serif Display, font-size 3rem, cor rgba(200,164,97,0.3), position absolute, top -0.5rem, left -0.25rem
- Nome: DM Sans, 0.875rem, weight 500, cor #8A94A6
  - Precedido por traco: "— Paciente 1"

### Cores
- Background secao: #0B1121
- Card bg: #111B2E
- Card border: #1E2A3F
- Card border hover: rgba(200,164,97,0.2)
- Texto depoimento: #F8F8F8
- Aspas decorativas: rgba(200,164,97,0.3)
- Nome: #8A94A6

### Animacoes
- Eyebrow: data-aos="fade-up"
- Carousel: @keyframes autoScroll — translateX(0) → translateX(-50%), linear, infinite, 30s
  - Os cards sao duplicados no HTML (6 cards para 3 depoimentos) para loop seamless
- Hover individual no card: translateY(-4px), box-shadow 0 12px 24px rgba(0,0,0,0.2), transition 0.3s ease

### Interatividade
- Hover no track: animation-play-state paused (pausa o carousel)
- Hover no card: lift effect — translateY(-4px) + shadow
- Touch/drag: nao implementar (manter simples)

### Responsividade
- Mobile: cards width 300px, gap 1rem
- Desktop: cards width clamp(300px, 40vw, 420px), gap 1.5rem
- Carousel funciona identico em todos os breakpoints

---

## Secao 8: FAQ

### Arquetipo e Constraints
- Arquetipo: Reveal on Demand (conteudo aparece com interacao)
- Constraints: Clip Reveal (Movimento), Asymmetric Padding (Layout)
- Justificativa: Accordion customizado (NAO generico) com reveal animado via clip-path. Padding assimetrico cria composicao editorial, nao parece FAQ padrao de template. Respostas sao reveladas com clip-path de cima para baixo.

### Conteudo
- Titulo: "Perguntas frequentes"
- 6 perguntas/respostas (da copy.md)

### Layout
- Background: #111B2E
- Container: max-width 1200px
- Grid: 2 colunas em desktop
  - Coluna esquerda (40%): titulo sticky (position sticky, top clamp(2rem, 5vw, 4rem))
  - Coluna direita (60%): accordion
  - Gap: clamp(2rem, 5vw, 4rem)
- Mobile: 1 coluna, titulo nao-sticky, margin-bottom 2rem
- Asymmetric padding: padding-left maior que padding-right na coluna do accordion — padding 0 0 0 clamp(1rem, 3vw, 2rem) em desktop

### Accordion item
- Border-bottom: 1px solid #1E2A3F
- Padding: 1.5rem 0
- Cursor: pointer

### Tipografia
- Titulo secao: DM Serif Display, clamp(1.75rem, 4vw, 2.75rem), cor #F8F8F8
- Pergunta: DM Sans, clamp(1rem, 1.5vw, 1.125rem), weight 500, cor #F8F8F8, display flex, justify-content space-between, align-items center
  - Icone: sinal "+" que rotaciona para "x" quando aberto
  - Icone: DM Sans, 1.5rem, weight 300, cor #C8A461, transition transform 0.3s ease
  - Aberto: rotate(45deg)
- Resposta: DM Sans, 0.9375rem, line-height 1.7, cor #8A94A6, padding-top 1rem

### Cores
- Background: #111B2E
- Pergunta texto: #F8F8F8
- Pergunta hover: #C8A461
- Icone: #C8A461
- Resposta: #8A94A6
- Divider: #1E2A3F

### Animacoes
- Titulo: data-aos="fade-up"
- Items: data-aos="fade-up", stagger 0, 50, 100, 150, 200, 250ms
- Resposta reveal: clip-path inset(0 0 100% 0) → inset(0 0 0% 0), transition 0.4s cubic-bezier(0.25, 1, 0.5, 1) + max-height 0 → max-height 300px, opacity 0 → 1 com 0.3s ease

### Interatividade
- Click na pergunta: toggle classe .is-open
- Apenas 1 item aberto por vez (fechar os outros ao abrir um novo)
- Hover na pergunta: cor muda para #C8A461, transition 0.2s ease
- Icone "+" rotaciona para 45deg (vira "x") quando aberto

### Responsividade
- Mobile (<768px): 1 coluna, titulo nao sticky, padding assimetrico removido
- Desktop (768px+): 2 colunas 40/60, titulo sticky, padding assimetrico ativo

---

## Secao 9: CTA Final

### Arquetipo e Constraints
- Arquetipo: Hero Dominante (Single Focus)
- Constraints: Headline Full Width (Tipografia), Gradiente Animado (Cor)
- Justificativa: Secao de fechamento com impacto maximo. Headline ocupa toda a largura. Gradiente animado no background cria sensacao de urgencia e vitalidade. Foco unico no CTA — sem distracao.

### Conteudo
- Titulo: "Seu proximo sorriso comeca com uma conversa"
- Subtexto: "Agende sua avaliacao com o Dr. Valdemir Neto. Sem compromisso, sem fila de espera. Atendimento exclusivo na Zona Leste de Teresina."
- CTA: "Agendar pelo WhatsApp" (link: wa.me/5586994263194)

### Layout
- Min-height: 70vh, display flex, align-items center, justify-content center, text-align center
- Container: max-width 900px
- Padding: clamp(4rem, 10vw, 8rem) vertical
- Position relative, overflow hidden (para background animado)

### Background
- Base: #0B1121
- Gradiente animado: pseudo-element ::before, position absolute, inset 0, z-index 0
  - Background: radial-gradient(ellipse at 20% 50%, rgba(200,164,97,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(200,164,97,0.05) 0%, transparent 50%)
  - Animation: @keyframes ctaGradient — background-position 0% 50% → 100% 50% → 0% 50%, 15s ease infinite
  - Background-size: 200% 200%
- Conteudo em z-index 1

### Tipografia
- Titulo: DM Serif Display, clamp(2rem, 5vw, 3.5rem), line-height 1.1, cor #F8F8F8, margin-bottom 1.5rem
  - Max-width: 100% (full width dentro do container)
- Subtexto: DM Sans, clamp(1rem, 1.5vw, 1.25rem), line-height 1.7, cor #8A94A6, max-width 600px, margin 0 auto 2.5rem auto
- CTA: identico ao hero CTA — DM Sans, 0.9375rem, weight 700, letter-spacing 0.05em, uppercase, padding 1rem 2.5rem
  - Background: #C8A461
  - Cor texto: #0B1121
  - Hover: translateY(-3px), background #D4B77A, box-shadow 0 8px 30px rgba(200,164,97,0.25)

### Cores
- Background: #0B1121
- Gradientes decorativos: rgba(200,164,97,0.08) e rgba(200,164,97,0.05)
- Titulo: #F8F8F8
- Subtexto: #8A94A6
- CTA: #C8A461 bg, #0B1121 texto
- CTA hover: #D4B77A bg

### Animacoes
- Titulo: data-aos="fade-up"
- Subtexto: data-aos="fade-up", delay 100
- CTA: data-aos="fade-up", delay 200
- Background gradiente: animacao infinita 15s ease

### Interatividade
- CTA: hover lift identico ao hero
- Sem outras interacoes — foco no CTA

### Responsividade
- Totalmente fluido via clamp(). Sem mudancas estruturais entre breakpoints.

---

## Footer

### Layout
- Padding: 2rem 0
- Text-align: center
- Border-top: 1px solid #1E2A3F
- Background: #0B1121

### Tipografia
- DM Sans, 0.8125rem, cor #8A94A6

### Conteudo
- "&copy; [ano dinamico] Clinica Valdemir Neto. Todos os direitos reservados."

---

## Notas Tecnicas para Implementacao

1. **AOS:** Inicializar com `disableMutationObserver: true`, `duration: 800`, `once: true`, `offset: 50`, `easing: 'ease-out-cubic'`
2. **Fontes:** Carregadas com `media="print" onload="this.media='all'"` + noscript fallback
3. **Hero:** ZERO animacoes de entrada. Animacoes pos-carregamento apenas.
4. **Scripts pesados:** Se usar mouse parallax, implementar com vanilla JS inline (nao importar libs). Usar requestAnimationFrame e debounce.
5. **Sections:** Usar `contain: layout paint` para performance
6. **WhatsApp link:** `https://wa.me/5586994263194?text=Ola!%20Gostaria%20de%20agendar%20uma%20avaliacao%20com%20o%20Dr.%20Valdemir%20Neto.`
7. **Carousel depoimentos:** Duplicar cards no HTML para loop infinito. Pausar com `animation-play-state: paused` no hover.
8. **FAQ accordion:** JS vanilla, toggle classe `.is-open`, fechar outros ao abrir um.
9. **Linha de steps:** CSS transition com IntersectionObserver simples.
10. **Noise texture:** SVG inline como background-image para zero requests HTTP adicionais.
