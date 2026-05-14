"""
NutriTrack — AI-Powered Nutrition Tracker
Built with Python + Streamlit

Author: NutriTrack Team
Version: 2.0.0

Screens:
    🏠 Home     — Log food, track macros vs goals, set daily targets
    📖 Recipes  — Browse 150+ recipes across 10 cuisines with filters
    🍳 Cook     — Step-by-step cooking guide with ingredient macros
    📊 Summary  — Charts, trends and full nutrition breakdown
"""

import streamlit as st
import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
import sys, os

sys.path.insert(0, os.path.dirname(__file__))

from data.dishes import DISHES
from data.food_data import INGREDIENTS, RECIPES
from data.constants import MEALS, GOAL_PRESETS, DEFAULT_GOALS, MACRO_META
from utils.nutrition import scale_nutrition, sum_nutrition, macro_percentages, progress_pct, items_by_meal
from utils.search import filter_dishes, filter_ingredients, filter_recipes, get_categories

# ── Page Config ───────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="NutriTrack",
    page_icon="🥗",
    layout="centered",
    initial_sidebar_state="collapsed",
)

# ── Global CSS ────────────────────────────────────────────────────────────────
st.markdown("""
<style>
.stApp { background-color: #060810; color: #f0ece6; }
#MainMenu, footer, header { visibility: hidden; }
.block-container { padding: 1rem 1rem 5rem 1rem; max-width: 480px; margin: auto; }
div[data-testid="stMetric"] { background: #0c0f1a; border: 1px solid #1a2035; border-radius: 12px; padding: 12px; }
div[data-testid="stMetric"] label { color: #7a8fa8 !important; font-size: 11px !important; }
div[data-testid="stMetric"] div[data-testid="stMetricValue"] { color: #f97316 !important; font-size: 22px !important; font-weight: 800 !important; }
.stButton > button { width: 100%; border-radius: 12px; font-weight: 700; border: none; padding: 10px 0; }
.stButton > button:hover { opacity: 0.9; transform: scale(1.01); }
.stTextInput > div > div > input { background: #0c0f1a; border: 1px solid #1a2035; border-radius: 10px; color: #f0ece6; }
.stSelectbox > div > div { background: #0c0f1a; border: 1px solid #1a2035; border-radius: 10px; color: #f0ece6; }
.stProgress > div > div { border-radius: 10px; }
div[data-testid="stExpander"] { background: #0c0f1a; border: 1px solid #1a2035; border-radius: 12px; }
.meal-icon { font-size: 20px; }
hr { border-color: #1a2035; }
</style>
""", unsafe_allow_html=True)

# ── Session State Init ─────────────────────────────────────────────────────────
def init_state():
    defaults = {
        "screen":       "home",
        "log":          [],
        "goals":        DEFAULT_GOALS.copy(),
        "meal":         "Lunch",
        "active_recipe": None,
        "cook_step":    0,
        "ing_checked":  {},
        "home_tab":     "log",
        "add_tab":      "dishes",
        "dish_cat":     "All",
        "ing_cat":      "All",
        "rcp_cat":      "All",
        "veg_filter":   "All",
        "search":       "",
        "chat_history": [],
    }
    for k, v in defaults.items():
        if k not in st.session_state:
            st.session_state[k] = v

init_state()

# ── Helper: navigate between screens ──────────────────────────────────────────
def go_to(screen, recipe=None):
    st.session_state.screen = screen
    if recipe:
        st.session_state.active_recipe = recipe
        st.session_state.cook_step = 0
        st.session_state.ing_checked = {}

# ── Helper: add item to log ────────────────────────────────────────────────────
def add_to_log(name, nutrition, serving, veg=None, qty=1.0):
    scaled = scale_nutrition(nutrition, qty)
    st.session_state.log.append({
        "id":   len(st.session_state.log),
        "meal": st.session_state.meal,
        "name": name,
        "srv":  f"{qty}x {serving}",
        "veg":  veg,
        "n":    scaled,
    })

# ── Helper: macro color ────────────────────────────────────────────────────────
MACRO_COLORS = {
    "cal": "#f97316",
    "p":   "#38bdf8",
    "c":   "#22c55e",
    "f":   "#a78bfa",
    "fi":  "#86efac",
    "na":  "#f87171",
}

# ── HEADER ────────────────────────────────────────────────────────────────────
def render_header():
    totals = sum_nutrition(st.session_state.log)
    goals  = st.session_state.goals
    pct    = progress_pct(totals["cal"], goals["cal"])

    st.markdown(f"""
    <div style="background:linear-gradient(135deg,#0c0f1a,#111524);border:1px solid #1a2035;
         border-radius:16px;padding:14px 16px;margin-bottom:12px;display:flex;
         justify-content:space-between;align-items:center;">
      <div>
        <div style="font-size:20px;font-weight:900;color:#f97316;letter-spacing:-0.5px;">🥗 NutriTrack</div>
        <div style="font-size:10px;color:#3d4a5c;margin-top:1px;">AI Nutrition Tracker</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:22px;font-weight:900;color:#f97316;">{totals['cal']}</div>
        <div style="font-size:10px;color:#3d4a5c;">/ {goals['cal']} kcal</div>
        <div style="width:80px;height:4px;background:#1a2035;border-radius:2px;margin-top:4px;">
          <div style="width:{min(pct,100):.0f}%;height:100%;background:{'#f87171' if totals['cal']>goals['cal'] else '#f97316'};border-radius:2px;"></div>
        </div>
      </div>
    </div>
    """, unsafe_allow_html=True)

# ── BOTTOM NAV ────────────────────────────────────────────────────────────────
def render_nav():
    st.markdown("<div style='height:60px;'></div>", unsafe_allow_html=True)
    tabs = [("🏠", "Home", "home"), ("📖", "Recipes", "recipes"), ("🍳", "Cook", "cook"), ("📊", "Summary", "summary"), ("🤖", "NutriBot", "nutribot")]
    cols = st.columns(5)
    for col, (icon, label, screen) in zip(cols, tabs):
        active = st.session_state.screen == screen
        with col:
            if st.button(f"{icon}\n{label}", key=f"nav_{screen}",
                         help=label,
                         type="primary" if active else "secondary"):
                st.session_state.screen = screen
                st.rerun()

# ══════════════════════════════════════════════════════════════════════════════
# 🏠 HOME SCREEN
# ══════════════════════════════════════════════════════════════════════════════
def screen_home():
    totals = sum_nutrition(st.session_state.log)
    goals  = st.session_state.goals

    # Meal selector
    st.markdown("**Select Meal**")
    meal_cols = st.columns(3)
    meal_icons = {"Breakfast":"☀️","Lunch":"🌤️","Dinner":"🌙","Snack":"🍎","Pre-Workout":"⚡","Post-Workout":"💪"}
    for i, m in enumerate(MEALS):
        with meal_cols[i % 3]:
            active = st.session_state.meal == m
            if st.button(f"{meal_icons.get(m,'🍽️')} {m}", key=f"meal_{m}",
                         type="primary" if active else "secondary"):
                st.session_state.meal = m
                st.rerun()

    st.markdown("---")

    # Sub-tabs
    tab_log, tab_add, tab_goals = st.tabs(["📋 Log", "➕ Add Food", "🎯 Goals"])

    # ── LOG TAB ──
    with tab_log:
        if not st.session_state.log:
            st.markdown("""
            <div style="text-align:center;padding:40px 20px;color:#3d4a5c;">
              <div style="font-size:40px;margin-bottom:12px;">🍽️</div>
              <div style="font-size:14px;font-weight:700;">No food logged yet</div>
              <div style="font-size:12px;margin-top:6px;">Tap Add Food to start tracking</div>
            </div>
            """, unsafe_allow_html=True)
        else:
            # Daily totals strip
            cols = st.columns(5)
            for col, (key, label, icon) in zip(cols, [
                ("cal","kcal","🔥"),("p","P","💪"),("c","C","🌾"),("f","F","🫙"),("fi","Fi","🌿")
            ]):
                with col:
                    st.metric(f"{icon} {label}", f"{totals[key]:.0f}")

            st.markdown("---")

            # Items grouped by meal
            by_meal = items_by_meal(st.session_state.log)
            for meal_name, items in by_meal.items():
                meal_cal = sum(i["n"]["cal"] for i in items)
                st.markdown(f"**{meal_icons.get(meal_name,'🍽️')} {meal_name}** · {meal_cal:.0f} kcal")
                for item in items:
                    n = item["n"]
                    veg_dot = "🟢" if item.get("veg") == 1 else ("🔴" if item.get("veg") == 0 else "⚪")
                    with st.expander(f"{veg_dot} {item['name']} — {n['cal']:.0f} kcal · {item['srv']}"):
                        c1, c2, c3, c4 = st.columns(4)
                        c1.metric("Protein", f"{n['p']:.1f}g")
                        c2.metric("Carbs",   f"{n['c']:.1f}g")
                        c3.metric("Fat",     f"{n['f']:.1f}g")
                        c4.metric("Fiber",   f"{n['fi']:.1f}g")
                        st.caption(f"🧂 Sodium: {n['na']:.0f}mg")
                        if st.button("🗑️ Remove", key=f"del_{item['id']}"):
                            st.session_state.log = [x for x in st.session_state.log if x["id"] != item["id"]]
                            st.rerun()

            st.markdown("---")
            if st.button("🗑️ Clear Entire Log", type="secondary"):
                st.session_state.log = []
                st.rerun()

    # ── ADD FOOD TAB ──
    with tab_add:
        add_tab = st.radio("Type", ["🍛 Dishes", "🥚 Ingredients"], horizontal=True, label_visibility="collapsed")
        st.session_state.search = st.text_input("Search food...", value=st.session_state.search, placeholder="e.g. chicken, rice, eggs")

        if "Dishes" in add_tab:
            # Category filter
            dish_cats = get_categories(DISHES)
            cat_cols = st.columns(4)
            for i, c in enumerate(dish_cats[:8]):
                with cat_cols[i % 4]:
                    if st.button(c, key=f"dc_{c}", type="primary" if st.session_state.dish_cat == c else "secondary"):
                        st.session_state.dish_cat = c
                        st.rerun()

            # Veg filter
            v_col1, v_col2, v_col3 = st.columns(3)
            for col, label, val in [(v_col1,"All","All"),(v_col2,"🟢 Veg","Veg"),(v_col3,"🔴 Non-Veg","NonVeg")]:
                with col:
                    if st.button(label, key=f"vf_{val}", type="primary" if st.session_state.veg_filter==val else "secondary"):
                        st.session_state.veg_filter = val
                        st.rerun()

            # Filter dishes
            veg_map = {"All": None, "Veg": 1, "NonVeg": 0}
            filtered = filter_dishes(DISHES,
                category=st.session_state.dish_cat,
                veg_filter=veg_map[st.session_state.veg_filter],
                search=st.session_state.search)

            st.markdown(f"<div style='font-size:11px;color:#3d4a5c;margin-bottom:8px;'>{len(filtered)} items found</div>", unsafe_allow_html=True)

            for name, d in filtered[:40]:
                veg_dot = "🟢" if d.get("veg") == 1 else "🔴"
                with st.expander(f"{veg_dot} {name} · {d['cal']} kcal · {d['srv']}"):
                    c1, c2, c3, c4 = st.columns(4)
                    c1.metric("Protein", f"{d['p']}g")
                    c2.metric("Carbs",   f"{d['c']}g")
                    c3.metric("Fat",     f"{d['f']}g")
                    c4.metric("Fiber",   f"{d['fi']}g")

                    qty = st.number_input("Servings", min_value=0.25, max_value=20.0,
                                         value=1.0, step=0.25, key=f"qty_d_{name}")
                    scaled = scale_nutrition({"cal":d["cal"],"p":d["p"],"f":d["f"],"c":d["c"],"fi":d["fi"],"na":d["na"]}, qty)
                    st.caption(f"Total: 🔥{scaled['cal']} kcal · 💪{scaled['p']}g P · 🌾{scaled['c']}g C · 🫙{scaled['f']}g F")

                    if st.button(f"+ Add {qty}x {name}", key=f"add_d_{name}", type="primary"):
                        add_to_log(name, {"cal":d["cal"],"p":d["p"],"f":d["f"],"c":d["c"],"fi":d["fi"],"na":d["na"]},
                                   d["srv"], d.get("veg"), qty)
                        st.success(f"✅ Added {qty}x {name} to {st.session_state.meal}!")
                        st.rerun()

        else:
            # Ingredients
            ing_cats = get_categories(INGREDIENTS)
            cat_cols = st.columns(4)
            for i, c in enumerate(ing_cats[:8]):
                with cat_cols[i % 4]:
                    if st.button(c, key=f"ic_{c}", type="primary" if st.session_state.ing_cat == c else "secondary"):
                        st.session_state.ing_cat = c
                        st.rerun()

            filtered_ing = filter_ingredients(INGREDIENTS,
                category=st.session_state.ing_cat,
                search=st.session_state.search)

            st.markdown(f"<div style='font-size:11px;color:#3d4a5c;margin-bottom:8px;'>{len(filtered_ing)} items found</div>", unsafe_allow_html=True)

            for name, d in filtered_ing[:40]:
                with st.expander(f"🧪 {name} · {d['cal']} kcal · {d['srv']}"):
                    c1, c2, c3, c4 = st.columns(4)
                    c1.metric("Protein", f"{d['p']}g")
                    c2.metric("Carbs",   f"{d['c']}g")
                    c3.metric("Fat",     f"{d['f']}g")
                    c4.metric("Fiber",   f"{d.get('fi',0)}g")

                    qty = st.number_input("Servings", min_value=0.25, max_value=20.0,
                                         value=1.0, step=0.25, key=f"qty_i_{name}")
                    scaled = scale_nutrition({"cal":d["cal"],"p":d["p"],"f":d["f"],"c":d["c"],"fi":d.get("fi",0),"na":d.get("na",0)}, qty)
                    st.caption(f"Total: 🔥{scaled['cal']} kcal · 💪{scaled['p']}g P · 🌾{scaled['c']}g C · 🫙{scaled['f']}g F")

                    if st.button(f"+ Add {qty}x {name}", key=f"add_i_{name}", type="primary"):
                        add_to_log(name, {"cal":d["cal"],"p":d["p"],"f":d["f"],"c":d["c"],"fi":d.get("fi",0),"na":d.get("na",0)},
                                   d["srv"], None, qty)
                        st.success(f"✅ Added {qty}x {name} to {st.session_state.meal}!")
                        st.rerun()

    # ── GOALS TAB ──
    with tab_goals:
        st.markdown("**Quick Presets**")
        preset_cols = st.columns(2)
        for i, preset in enumerate(GOAL_PRESETS):
            with preset_cols[i % 2]:
                if st.button(preset["name"], key=f"preset_{i}"):
                    for k in ["cal","p","c","f","fi","na"]:
                        st.session_state.goals[k] = preset[k]
                    st.success(f"✅ Goals set to {preset['name']}!")
                    st.rerun()

        st.markdown("---")
        st.markdown("**Manual Adjustment**")
        for m in MACRO_META:
            st.session_state.goals[m["key"]] = st.number_input(
                f"{m['icon']} {m['label']} ({m['unit']})",
                min_value=m["min"], max_value=m["max"],
                value=st.session_state.goals[m["key"]],
                step=m["step"], key=f"goal_{m['key']}")

# ══════════════════════════════════════════════════════════════════════════════
# 📖 RECIPES SCREEN
# ══════════════════════════════════════════════════════════════════════════════
def screen_recipes():
    st.markdown("## 👨‍🍳 Recipes")
    st.markdown("<div style='font-size:12px;color:#3d4a5c;margin-bottom:12px;'>Tap any recipe to see full cooking guide with ingredient macros.</div>", unsafe_allow_html=True)

    # Filters
    search = st.text_input("Search recipes...", placeholder="e.g. biryani, pasta, ramen")
    rcp_cats = ["All"] + sorted(set(r["cat"] for r in RECIPES.values()))
    col1, col2 = st.columns(2)
    with col1:
        cat = st.selectbox("Cuisine", rcp_cats, key="rcp_cat_select")
    with col2:
        veg_opt = st.selectbox("Diet", ["All", "Vegetarian", "Non-Vegetarian"], key="rcp_veg_select")

    veg_map = {"All": None, "Vegetarian": 1, "Non-Vegetarian": 0}
    filtered = filter_recipes(RECIPES, category=cat, veg_filter=veg_map[veg_opt], search=search)

    diff_colors = {"Easy": "🟢", "Medium": "🟡", "Hard": "🔴"}

    st.markdown(f"<div style='font-size:11px;color:#3d4a5c;margin-bottom:8px;'>{len(filtered)} recipes found</div>", unsafe_allow_html=True)

    for name, r in filtered:
        veg_dot = "🟢" if r.get("veg") else "🔴"
        diff_dot = diff_colors.get(r.get("diff","Medium"), "🟡")
        with st.expander(f"{veg_dot} **{name}** · {r.get('cal',0)} kcal/serving · {diff_dot} {r.get('diff','Medium')}"):
            st.markdown(f"*{r.get('desc','')}*")

            # Macro strip
            mc1, mc2, mc3, mc4, mc5 = st.columns(5)
            mc1.metric("🔥 Cal",   f"{r.get('cal',0)}")
            mc2.metric("💪 Protein", f"{r.get('p',0)}g")
            mc3.metric("🌾 Carbs",  f"{r.get('c',0)}g")
            mc4.metric("🫙 Fat",    f"{r.get('f',0)}g")
            mc5.metric("🌿 Fiber",  f"{r.get('fi',0)}g")

            st.caption(f"⏱ {r.get('time','?')} · 👥 {r.get('serves','?')} servings · {r.get('cat','')}")

            if st.button(f"🍳 Start Cooking {name}", key=f"cook_{name}", type="primary"):
                go_to("cook", name)
                st.rerun()

# ══════════════════════════════════════════════════════════════════════════════
# 🍳 COOK SCREEN
# ══════════════════════════════════════════════════════════════════════════════
def screen_cook():
    recipe_name = st.session_state.active_recipe

    if not recipe_name or recipe_name not in RECIPES:
        st.markdown("""
        <div style="text-align:center;padding:60px 20px;color:#3d4a5c;">
          <div style="font-size:48px;margin-bottom:12px;">🍳</div>
          <div style="font-size:16px;font-weight:700;">No recipe selected</div>
          <div style="font-size:12px;margin-top:8px;">Go to Recipes and tap Start Cooking</div>
        </div>
        """, unsafe_allow_html=True)
        if st.button("📖 Browse Recipes", type="primary"):
            go_to("recipes")
            st.rerun()
        return

    r = RECIPES[recipe_name]
    steps       = r.get("steps", [])
    ingredients = r.get("ingredients", [])
    current     = st.session_state.cook_step
    total_steps = len(steps)

    # ── Recipe Header ──
    st.markdown(f"## 🍳 {recipe_name}")
    veg_label = "🟢 Vegetarian" if r.get("veg") else "🔴 Non-Vegetarian"
    st.markdown(f"*{r.get('desc','')}*")
    st.caption(f"{veg_label} · ⏱ {r.get('time','?')} · 👥 {r.get('serves','?')} servings · {r.get('diff','Medium')} difficulty")

    # Macro strip
    m1, m2, m3, m4, m5 = st.columns(5)
    m1.metric("🔥 Cal",   f"{r.get('cal',0)}")
    m2.metric("💪 Protein", f"{r.get('p',0)}g")
    m3.metric("🌾 Carbs",  f"{r.get('c',0)}g")
    m4.metric("🫙 Fat",    f"{r.get('f',0)}g")
    m5.metric("🌿 Fiber",  f"{r.get('fi',0)}g")

    st.markdown("---")

    # ── Two Tabs: Ingredients | Steps ──
    ing_tab, step_tab = st.tabs(["🧺 Ingredients", "📋 Step-by-Step"])

    with ing_tab:
        st.markdown("**Gather your ingredients:**")
        total_ing_cal = 0
        for i, ing in enumerate(ingredients):
            key = f"ing_{recipe_name}_{i}"
            checked = st.session_state.ing_checked.get(key, False)
            col_a, col_b = st.columns([0.08, 0.92])
            with col_a:
                if st.checkbox("", value=checked, key=f"cb_{key}"):
                    st.session_state.ing_checked[key] = True
                else:
                    st.session_state.ing_checked[key] = False
            with col_b:
                check_style = "text-decoration:line-through;color:#3d4a5c;" if st.session_state.ing_checked.get(key) else "color:#f0ece6;"
                cal_val = ing.get("cal", 0)
                total_ing_cal += cal_val
                st.markdown(
                    f"<span style='{check_style}'><b>{ing['name']}</b> — {ing['qty']}</span>"
                    f"<span style='color:#f97316;font-size:11px;'> · 🔥{cal_val} kcal"
                    f" · 💪{ing.get('p',0)}g · 🌾{ing.get('c',0)}g · 🫙{ing.get('f',0)}g</span>",
                    unsafe_allow_html=True)

        st.markdown("---")
        st.markdown(f"**Total raw ingredients:** 🔥 {total_ing_cal} kcal")

        checked_count = sum(1 for k, v in st.session_state.ing_checked.items() if recipe_name in k and v)
        st.progress(checked_count / max(len(ingredients), 1), text=f"Gathered {checked_count}/{len(ingredients)} ingredients")

    with step_tab:
        if total_steps == 0:
            st.info("No steps available for this recipe.")
        else:
            # Progress bar
            progress_val = current / total_steps
            st.progress(progress_val, text=f"Step {current + 1} of {total_steps}")

            # Current step card
            step = steps[current]
            st.markdown(f"""
            <div style="background:#0c0f1a;border:2px solid #f97316;border-radius:16px;padding:20px;margin:12px 0;">
              <div style="font-size:11px;color:#f97316;font-weight:700;margin-bottom:6px;">STEP {current+1} OF {total_steps}</div>
              <div style="font-size:17px;font-weight:800;margin-bottom:10px;">{step.get('t','')}</div>
              <div style="font-size:13px;color:#b0bcc8;line-height:1.6;">{step.get('d','')}</div>
            </div>
            """, unsafe_allow_html=True)

            # Navigation buttons
            nav_col1, nav_col2, nav_col3 = st.columns([1, 1, 1])
            with nav_col1:
                if current > 0:
                    if st.button("⬅️ Previous", key="prev_step"):
                        st.session_state.cook_step -= 1
                        st.rerun()
            with nav_col2:
                st.markdown(f"<div style='text-align:center;color:#3d4a5c;font-size:11px;padding-top:10px;'>{current+1} / {total_steps}</div>", unsafe_allow_html=True)
            with nav_col3:
                if current < total_steps - 1:
                    if st.button("Next ➡️", key="next_step"):
                        st.session_state.cook_step += 1
                        st.rerun()
                else:
                    if st.button("✅ Done!", key="done_step", type="primary"):
                        st.balloons()
                        st.success(f"🎉 {recipe_name} is ready!")

            st.markdown("---")

            # All steps overview
            st.markdown("**All Steps:**")
            for i, s in enumerate(steps):
                done = i < current
                active = i == current
                color = "#22c55e" if done else ("#f97316" if active else "#3d4a5c")
                icon = "✅" if done else ("▶️" if active else "⬜")
                if st.button(f"{icon} {i+1}. {s.get('t','')}", key=f"jump_{i}",
                             type="primary" if active else "secondary"):
                    st.session_state.cook_step = i
                    st.rerun()

    st.markdown("---")
    # Log servings button
    srv_qty = st.number_input("Log servings to food diary:", min_value=0.5, max_value=10.0, value=1.0, step=0.5)
    if st.button(f"📋 Log {srv_qty} serving(s) to Diary", type="primary"):
        nutrition = {"cal": r.get("cal",0), "p": r.get("p",0), "f": r.get("f",0),
                     "c": r.get("c",0), "fi": r.get("fi",0), "na": r.get("na",0)}
        add_to_log(recipe_name, nutrition, f"{r.get('serves',1)} servings", r.get("veg"), srv_qty)
        st.success(f"✅ {srv_qty} serving(s) of {recipe_name} logged!")

    if st.button("📖 Back to Recipes", type="secondary"):
        go_to("recipes")
        st.rerun()

# ══════════════════════════════════════════════════════════════════════════════
# 📊 SUMMARY SCREEN
# ══════════════════════════════════════════════════════════════════════════════
def screen_summary():
    st.markdown("## 📊 Daily Summary")

    totals = sum_nutrition(st.session_state.log)
    goals  = st.session_state.goals

    if not st.session_state.log:
        st.markdown("""
        <div style="text-align:center;padding:60px 20px;color:#3d4a5c;">
          <div style="font-size:48px;margin-bottom:12px;">📊</div>
          <div style="font-size:16px;font-weight:700;">No data yet</div>
          <div style="font-size:12px;margin-top:8px;">Log some food to see your daily summary</div>
        </div>
        """, unsafe_allow_html=True)
        return

    # ── Macro Progress Bars ──
    st.markdown("### 🎯 Progress vs Goals")
    for m in MACRO_META:
        key   = m["key"]
        curr  = totals[key]
        goal  = goals[key]
        pct   = progress_pct(curr, goal)
        over  = curr > goal
        color = "#f87171" if over else m["color"]
        diff  = abs(curr - goal)
        label = f"{'Over' if over else 'Left'}: {diff:.0f}{m['unit']}"

        st.markdown(f"**{m['icon']} {m['label']}** — {curr:.0f} / {goal} {m['unit']}")
        st.progress(min(pct / 100, 1.0))
        st.caption(label)

    st.markdown("---")

    # ── Macro Split Donut Chart ──
    st.markdown("### 🍩 Macro Split")
    pcts = macro_percentages(totals["p"], totals["c"], totals["f"])
    fig_donut = go.Figure(data=[go.Pie(
        labels=["Protein", "Carbs", "Fat"],
        values=[pcts["protein_pct"], pcts["carbs_pct"], pcts["fat_pct"]],
        hole=0.6,
        marker=dict(colors=["#38bdf8", "#22c55e", "#a78bfa"]),
        textfont=dict(color="white"),
    )])
    fig_donut.update_layout(
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        font=dict(color="white"),
        showlegend=True,
        legend=dict(font=dict(color="white")),
        height=280,
        margin=dict(t=20, b=20, l=20, r=20),
        annotations=[dict(text=f"<b>{totals['cal']:.0f}</b><br>kcal", x=0.5, y=0.5,
                          font_size=14, font_color="white", showarrow=False)],
    )
    st.plotly_chart(fig_donut, use_container_width=True)

    # ── Calories by Meal Bar Chart ──
    st.markdown("### 🍽️ Calories by Meal")
    by_meal = items_by_meal(st.session_state.log)
    meal_data = {m: sum(i["n"]["cal"] for i in items) for m, items in by_meal.items()}
    if meal_data:
        fig_bar = go.Figure(data=[go.Bar(
            x=list(meal_data.keys()),
            y=list(meal_data.values()),
            marker_color="#f97316",
            text=[f"{v:.0f}" for v in meal_data.values()],
            textposition="outside",
            textfont=dict(color="white"),
        )])
        fig_bar.update_layout(
            paper_bgcolor="rgba(0,0,0,0)",
            plot_bgcolor="rgba(0,0,0,0)",
            font=dict(color="white"),
            xaxis=dict(color="white"),
            yaxis=dict(color="white", gridcolor="#1a2035"),
            height=250,
            margin=dict(t=20, b=20, l=20, r=20),
        )
        st.plotly_chart(fig_bar, use_container_width=True)

    # ── Full Log Table ──
    st.markdown("### 📋 Full Food Log")
    if st.session_state.log:
        df = pd.DataFrame([{
            "Meal":    item["meal"],
            "Food":    item["name"],
            "Serving": item["srv"],
            "Cal":     item["n"]["cal"],
            "Protein": f"{item['n']['p']}g",
            "Carbs":   f"{item['n']['c']}g",
            "Fat":     f"{item['n']['f']}g",
        } for item in st.session_state.log])
        st.dataframe(df, use_container_width=True, hide_index=True)

    st.markdown("---")
    if st.button("🗑️ Clear All & Start Fresh", type="secondary"):
        st.session_state.log = []
        st.rerun()

# ══════════════════════════════════════════════════════════════════════════════
# 🤖 NUTRIBOT SCREEN — RAG-Powered AI Nutrition Assistant
# ══════════════════════════════════════════════════════════════════════════════
def screen_nutribot():
    st.markdown("## 🤖 NutriBot")
    st.markdown(
        "<div style='font-size:13px;color:#7a8fa8;margin-bottom:8px;'>"
        "Ask me anything about nutrition, food, recipes or cooking. "
        "I answer from NutriTrack's database of 167 dishes, 76 ingredients and 28+ recipes."
        "</div>",
        unsafe_allow_html=True,
    )

    # ── How it works explainer ────────────────────────────────────────────────
    with st.expander("💡 How NutriBot works (RAG explained)"):
        st.markdown("""
**RAG = Retrieval Augmented Generation**

When you ask a question, NutriBot does 3 things:

1. **🔍 Retrieve** — Searches NutriTrack's 275 food chunks to find the most relevant dishes/recipes for your question
2. **📋 Augment** — Combines those results with your question into a detailed prompt
3. **🤖 Generate** — Sends everything to Claude AI which answers specifically from NutriTrack's data

**Why RAG?** Without it, an AI would give generic answers. With RAG, it answers specifically about the foods in *this* app's database.
        """)

    # ── Example questions ─────────────────────────────────────────────────────
    st.markdown("**Try asking:**")
    example_cols = st.columns(2)
    examples = [
        "What are the highest protein Indian dishes?",
        "Suggest a low calorie breakfast under 300 calories",
        "How do I cook Butter Chicken step by step?",
        "What vegetarian dishes have more than 15g protein?",
        "Compare the macros of Chicken Biryani vs Dal Makhani",
        "What ingredients are high in fiber?",
    ]
    for i, example in enumerate(examples):
        with example_cols[i % 2]:
            if st.button(f"💬 {example}", key=f"ex_{i}", use_container_width=True):
                st.session_state.chat_history.append({"role": "user", "content": example})
                st.session_state["pending_question"] = example
                st.rerun()

    st.markdown("---")

    # ── Chat history display ──────────────────────────────────────────────────
    for message in st.session_state.chat_history:
        if message["role"] == "user":
            with st.chat_message("user"):
                st.write(message["content"])
        else:
            with st.chat_message("assistant", avatar="🤖"):
                st.write(message["content"])
                # Show sources if available
                if message.get("sources"):
                    with st.expander(f"📚 Sources used ({len(message['sources'])} items from NutriTrack database)"):
                        for src in message["sources"][:4]:
                            st.markdown(f"**{src['name']}** ({src['type']}) — {src['text'][:120]}...")

    # ── Chat input ────────────────────────────────────────────────────────────
    # Handle example button clicks
    if "pending_question" in st.session_state and st.session_state["pending_question"]:
        user_input = st.session_state["pending_question"]
        st.session_state["pending_question"] = ""
    else:
        user_input = st.chat_input("Ask about nutrition, food or recipes...")

    if user_input:
        # Only add if not already the last message
        if not st.session_state.chat_history or st.session_state.chat_history[-1].get("content") != user_input:
            st.session_state.chat_history.append({"role": "user", "content": user_input})

        # Show user message immediately
        with st.chat_message("user"):
            st.write(user_input)

        # Generate RAG answer
        with st.chat_message("assistant", avatar="🤖"):
            with st.spinner("🔍 Searching NutriTrack database..."):
                try:
                    from rag.generator import generate_answer
                    result = generate_answer(
                        query=user_input,
                        conversation_history=[
                            m for m in st.session_state.chat_history[:-1]
                            if m["role"] in ("user", "assistant")
                        ],
                    )
                    answer  = result["answer"]
                    sources = result["sources"]
                except Exception as e:
                    answer  = f"⚠️ Error: {str(e)}"
                    sources = []

            st.write(answer)

            if sources:
                with st.expander(f"📚 Sources used ({len(sources)} items from NutriTrack database)"):
                    for src in sources[:4]:
                        st.markdown(f"**{src['name']}** ({src['type']}) — {src['text'][:120]}...")

        # Save assistant message
        st.session_state.chat_history.append({
            "role":    "assistant",
            "content": answer,
            "sources": sources,
        })
        st.rerun()

    # ── Clear chat button ─────────────────────────────────────────────────────
    if st.session_state.chat_history:
        st.markdown("---")
        if st.button("🗑️ Clear Chat", type="secondary"):
            st.session_state.chat_history = []
            st.rerun()


# ══════════════════════════════════════════════════════════════════════════════
# MAIN ROUTER
# ══════════════════════════════════════════════════════════════════════════════
render_header()

screen = st.session_state.screen
if screen == "home":
    screen_home()
elif screen == "recipes":
    screen_recipes()
elif screen == "cook":
    screen_cook()
elif screen == "summary":
    screen_summary()
elif screen == "nutribot":
    screen_nutribot()

render_nav()
