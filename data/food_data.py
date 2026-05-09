# =============================================================================
# INGREDIENTS DATABASE — Raw ingredients (USDA-verified)
# =============================================================================

INGREDIENTS = {
    # ── SUPPLEMENTS ───────────────────────────────────────────────────────────
    "Whey Isolate":          {"cal":113,"p":27,"f":0, "c":1, "fi":0,"na":50,  "cat":"Supplements","srv":"30g (1 scoop)"},
    "Whey Concentrate":      {"cal":120,"p":24,"f":2, "c":3, "fi":0,"na":60,  "cat":"Supplements","srv":"30g (1 scoop)"},
    "Casein Protein":        {"cal":120,"p":24,"f":1, "c":4, "fi":1,"na":100, "cat":"Supplements","srv":"30g (1 scoop)"},
    "Plant Protein":         {"cal":120,"p":22,"f":2, "c":5, "fi":2,"na":130, "cat":"Supplements","srv":"30g (1 scoop)"},
    "Mass Gainer":           {"cal":380,"p":25,"f":4, "c":65,"fi":2,"na":280, "cat":"Supplements","srv":"100g"},
    "Creatine":              {"cal":0,  "p":0, "f":0, "c":0, "fi":0,"na":0,   "cat":"Supplements","srv":"5g"},
    # ── EGGS & DAIRY ──────────────────────────────────────────────────────────
    "Egg (whole)":           {"cal":78, "p":6, "f":5, "c":1, "fi":0,"na":62,  "cat":"Eggs & Dairy","srv":"1 large"},
    "Egg White":             {"cal":17, "p":4, "f":0, "c":0, "fi":0,"na":55,  "cat":"Eggs & Dairy","srv":"1 white"},
    "Milk Whole":            {"cal":61, "p":3, "f":3, "c":5, "fi":0,"na":44,  "cat":"Eggs & Dairy","srv":"100ml"},
    "Greek Yogurt":          {"cal":100,"p":17,"f":0, "c":6, "fi":0,"na":65,  "cat":"Eggs & Dairy","srv":"100g"},
    "Curd Yogurt":           {"cal":98, "p":11,"f":5, "c":4, "fi":0,"na":70,  "cat":"Eggs & Dairy","srv":"100g"},
    "Paneer":                {"cal":265,"p":18,"f":21,"c":2, "fi":0,"na":28,  "cat":"Eggs & Dairy","srv":"100g"},
    "Cottage Cheese":        {"cal":72, "p":12,"f":1, "c":3, "fi":0,"na":321, "cat":"Eggs & Dairy","srv":"100g"},
    "Cheddar Cheese":        {"cal":403,"p":25,"f":33,"c":1, "fi":0,"na":621, "cat":"Eggs & Dairy","srv":"100g"},
    "Butter":                {"cal":717,"p":1, "f":81,"c":0, "fi":0,"na":11,  "cat":"Eggs & Dairy","srv":"100g"},
    "Ghee":                  {"cal":900,"p":0, "f":99,"c":0, "fi":0,"na":0,   "cat":"Eggs & Dairy","srv":"100g"},
    "Cream Cheese":          {"cal":342,"p":6, "f":34,"c":4, "fi":0,"na":310, "cat":"Eggs & Dairy","srv":"100g"},
    # ── MEAT & FISH ───────────────────────────────────────────────────────────
    "Chicken Breast":        {"cal":120,"p":23,"f":3, "c":0, "fi":0,"na":74,  "cat":"Meat & Fish","srv":"100g raw"},
    "Chicken Thigh":         {"cal":177,"p":19,"f":11,"c":0, "fi":0,"na":90,  "cat":"Meat & Fish","srv":"100g raw"},
    "Turkey Breast":         {"cal":104,"p":24,"f":1, "c":0, "fi":0,"na":74,  "cat":"Meat & Fish","srv":"100g"},
    "Mutton Lamb":           {"cal":258,"p":19,"f":20,"c":0, "fi":0,"na":84,  "cat":"Meat & Fish","srv":"100g"},
    "Salmon":                {"cal":208,"p":20,"f":13,"c":0, "fi":0,"na":59,  "cat":"Meat & Fish","srv":"100g"},
    "Tuna Canned":           {"cal":116,"p":25,"f":1, "c":0, "fi":0,"na":400, "cat":"Meat & Fish","srv":"100g"},
    "Prawns":                {"cal":85, "p":20,"f":1, "c":0, "fi":0,"na":119, "cat":"Meat & Fish","srv":"100g"},
    # ── GRAINS ────────────────────────────────────────────────────────────────
    "Rice Raw":              {"cal":365,"p":7, "f":1, "c":80,"fi":1,"na":5,   "cat":"Grains","srv":"100g"},
    "Rice Cooked":           {"cal":130,"p":3, "f":0, "c":28,"fi":0,"na":1,   "cat":"Grains","srv":"100g"},
    "Brown Rice":            {"cal":370,"p":8, "f":3, "c":77,"fi":4,"na":7,   "cat":"Grains","srv":"100g dry"},
    "Oats Rolled":           {"cal":389,"p":17,"f":7, "c":66,"fi":10,"na":2,  "cat":"Grains","srv":"100g dry"},
    "Wheat Flour Atta":      {"cal":341,"p":12,"f":2, "c":72,"fi":10,"na":2,  "cat":"Grains","srv":"100g"},
    "Besan":                 {"cal":387,"p":22,"f":7, "c":58,"fi":11,"na":64, "cat":"Grains","srv":"100g"},
    "Quinoa":                {"cal":368,"p":14,"f":6, "c":64,"fi":7, "na":5,  "cat":"Grains","srv":"100g dry"},
    "Pasta Dry":             {"cal":371,"p":13,"f":2, "c":75,"fi":3, "na":6,  "cat":"Grains","srv":"100g dry"},
    "Bread White":           {"cal":265,"p":9, "f":3, "c":51,"fi":3, "na":491,"cat":"Grains","srv":"100g"},
    "Sweet Potato":          {"cal":86, "p":2, "f":0, "c":20,"fi":3, "na":55, "cat":"Grains","srv":"100g"},
    "Bagel":                 {"cal":257,"p":10,"f":2, "c":50,"fi":2, "na":430,"cat":"Grains","srv":"100g"},
    # ── VEGETABLES ────────────────────────────────────────────────────────────
    "Onion":                 {"cal":40, "p":1, "f":0, "c":9, "fi":2, "na":4,  "cat":"Vegetables","srv":"100g"},
    "Tomato":                {"cal":18, "p":1, "f":0, "c":4, "fi":1, "na":5,  "cat":"Vegetables","srv":"100g"},
    "Garlic":                {"cal":149,"p":6, "f":0, "c":33,"fi":2, "na":17, "cat":"Vegetables","srv":"100g"},
    "Ginger":                {"cal":80, "p":2, "f":1, "c":18,"fi":2, "na":13, "cat":"Vegetables","srv":"100g"},
    "Potato":                {"cal":77, "p":2, "f":0, "c":17,"fi":2, "na":6,  "cat":"Vegetables","srv":"100g"},
    "Spinach":               {"cal":23, "p":3, "f":0, "c":4, "fi":2, "na":79, "cat":"Vegetables","srv":"100g"},
    "Broccoli":              {"cal":34, "p":3, "f":0, "c":7, "fi":3, "na":33, "cat":"Vegetables","srv":"100g"},
    "Carrot":                {"cal":41, "p":1, "f":0, "c":10,"fi":3, "na":69, "cat":"Vegetables","srv":"100g"},
    "Capsicum":              {"cal":31, "p":1, "f":0, "c":6, "fi":2, "na":4,  "cat":"Vegetables","srv":"100g"},
    "Mushroom":              {"cal":22, "p":3, "f":0, "c":3, "fi":1, "na":5,  "cat":"Vegetables","srv":"100g"},
    "Corn":                  {"cal":86, "p":3, "f":1, "c":19,"fi":3, "na":15, "cat":"Vegetables","srv":"100g"},
    "Cucumber":              {"cal":15, "p":1, "f":0, "c":4, "fi":1, "na":2,  "cat":"Vegetables","srv":"100g"},
    # ── FRUITS ────────────────────────────────────────────────────────────────
    "Banana":                {"cal":89, "p":1, "f":0, "c":23,"fi":3, "na":1,  "cat":"Fruits","srv":"1 medium"},
    "Apple":                 {"cal":95, "p":0, "f":0, "c":25,"fi":4, "na":2,  "cat":"Fruits","srv":"1 medium"},
    "Orange":                {"cal":62, "p":1, "f":0, "c":15,"fi":3, "na":0,  "cat":"Fruits","srv":"1 medium"},
    "Mango":                 {"cal":60, "p":1, "f":0, "c":15,"fi":2, "na":1,  "cat":"Fruits","srv":"100g"},
    "Avocado":               {"cal":160,"p":2, "f":15,"c":9, "fi":7, "na":7,  "cat":"Fruits","srv":"100g"},
    "Strawberries":          {"cal":33, "p":1, "f":0, "c":8, "fi":2, "na":1,  "cat":"Fruits","srv":"100g"},
    "Blueberries":           {"cal":57, "p":1, "f":0, "c":14,"fi":2, "na":1,  "cat":"Fruits","srv":"100g"},
    "Dates":                 {"cal":277,"p":2, "f":0, "c":75,"fi":7, "na":1,  "cat":"Fruits","srv":"100g"},
    # ── NUTS & SEEDS ──────────────────────────────────────────────────────────
    "Almonds":               {"cal":579,"p":21,"f":50,"c":22,"fi":13,"na":1,  "cat":"Nuts & Seeds","srv":"100g"},
    "Cashews":               {"cal":553,"p":18,"f":44,"c":30,"fi":3, "na":12, "cat":"Nuts & Seeds","srv":"100g"},
    "Peanut Butter":         {"cal":588,"p":25,"f":50,"c":20,"fi":6, "na":459,"cat":"Nuts & Seeds","srv":"100g"},
    "Chia Seeds":            {"cal":486,"p":17,"f":31,"c":42,"fi":34,"na":16, "cat":"Nuts & Seeds","srv":"100g"},
    "Peanuts":               {"cal":567,"p":26,"f":49,"c":16,"fi":9, "na":18, "cat":"Nuts & Seeds","srv":"100g"},
    # ── OILS ──────────────────────────────────────────────────────────────────
    "Olive Oil":             {"cal":884,"p":0, "f":100,"c":0,"fi":0, "na":2,  "cat":"Oils","srv":"100ml"},
    "Ghee Oil":              {"cal":900,"p":0, "f":99, "c":0,"fi":0, "na":0,  "cat":"Oils","srv":"100g"},
    "Coconut Oil":           {"cal":862,"p":0, "f":100,"c":0,"fi":0, "na":0,  "cat":"Oils","srv":"100ml"},
    # ── PULSES ────────────────────────────────────────────────────────────────
    "Toor Dal Dry":          {"cal":343,"p":22,"f":1, "c":62,"fi":15,"na":30, "cat":"Pulses","srv":"100g dry"},
    "Moong Dal Dry":         {"cal":347,"p":24,"f":1, "c":63,"fi":16,"na":15, "cat":"Pulses","srv":"100g dry"},
    "Rajma Dry":             {"cal":333,"p":24,"f":1, "c":60,"fi":25,"na":28, "cat":"Pulses","srv":"100g dry"},
    "Chickpeas Dry":         {"cal":364,"p":19,"f":6, "c":61,"fi":17,"na":24, "cat":"Pulses","srv":"100g dry"},
    # ── SPICES ────────────────────────────────────────────────────────────────
    "Salt":                  {"cal":0,  "p":0, "f":0, "c":0, "fi":0,"na":38758,"cat":"Spices","srv":"100g"},
    "Turmeric":              {"cal":312,"p":10,"f":3, "c":68,"fi":22,"na":38, "cat":"Spices","srv":"100g"},
    "Red Chilli Powder":     {"cal":314,"p":12,"f":14,"c":56,"fi":27,"na":30, "cat":"Spices","srv":"100g"},
    "Garam Masala":          {"cal":379,"p":13,"f":15,"c":51,"fi":17,"na":65, "cat":"Spices","srv":"100g"},
    "Sugar White":           {"cal":387,"p":0, "f":0, "c":100,"fi":0,"na":1,  "cat":"Spices","srv":"100g"},
    "Honey":                 {"cal":304,"p":0, "f":0, "c":82,"fi":0, "na":4,  "cat":"Spices","srv":"100g"},
    # ── SAUCES ────────────────────────────────────────────────────────────────
    "Tomato Ketchup":        {"cal":112,"p":1, "f":0, "c":27,"fi":1, "na":907,"cat":"Sauces","srv":"100g"},
    "Soy Sauce":             {"cal":53, "p":8, "f":0, "c":5, "fi":0, "na":5493,"cat":"Sauces","srv":"100ml"},
    "Mayonnaise":            {"cal":680,"p":1, "f":75,"c":2, "fi":0, "na":635,"cat":"Sauces","srv":"100g"},
}

# =============================================================================
# RECIPES DATABASE — Full recipes with step-by-step instructions
# =============================================================================

RECIPES = {
    "Butter Chicken": {
        "cat": "Indian", "veg": False, "time": "45 min", "serves": 4, "diff": "Medium",
        "cal": 320, "p": 26, "f": 18, "c": 12, "fi": 1, "na": 590,
        "desc": "Rich, creamy tomato-based chicken curry — India's most iconic dish.",
        "ingredients": [
            {"name": "Chicken Breast",   "qty": "500g",      "cal": 600, "p": 115, "f": 15, "c": 0},
            {"name": "Plain Yogurt",     "qty": "1 cup",     "cal": 147, "p": 8,   "f": 4,  "c": 20},
            {"name": "Butter",           "qty": "2 tbsp",    "cal": 200, "p": 0,   "f": 23, "c": 0},
            {"name": "Onion",            "qty": "2 large",   "cal": 120, "p": 3,   "f": 0,  "c": 27},
            {"name": "Tomatoes pureed",  "qty": "400g",      "cal": 72,  "p": 4,   "f": 0,  "c": 16},
            {"name": "Heavy Cream",      "qty": "1/2 cup",   "cal": 408, "p": 2,   "f": 43, "c": 4},
            {"name": "Garlic",           "qty": "4 cloves",  "cal": 18,  "p": 1,   "f": 0,  "c": 4},
            {"name": "Garam Masala",     "qty": "2 tsp",     "cal": 23,  "p": 1,   "f": 1,  "c": 3},
            {"name": "Red Chilli Powder","qty": "2 tsp",     "cal": 19,  "p": 1,   "f": 1,  "c": 3},
            {"name": "Kasuri Methi",     "qty": "1 tbsp",    "cal": 10,  "p": 1,   "f": 0,  "c": 1},
        ],
        "steps": [
            {"t": "Marinate Chicken",    "d": "Mix yogurt with red chilli, turmeric, garam masala and salt. Add chicken cubes, coat well. Marinate minimum 30 minutes."},
            {"t": "Grill the Chicken",   "d": "Cook marinated chicken on high heat 4-5 min per side until slightly charred. Set aside for the smoky flavour."},
            {"t": "Make the Masala",     "d": "Heat butter and oil. Cook onions 10 min until golden. Add garlic and ginger, cook 2 min. Add tomato puree and spices, cook 12-15 min until oil separates."},
            {"t": "Blend the Sauce",     "d": "Cool slightly. Blend until completely smooth. Return to pan through a strainer for silky texture."},
            {"t": "Combine & Simmer",    "d": "Add grilled chicken to sauce. Stir in heavy cream. Simmer 8-10 min. Add kasuri methi and garam masala."},
            {"t": "Serve",               "d": "Swirl cream on top. Garnish with coriander. Serve with butter naan or basmati rice."},
        ]
    },
    "Dal Tadka": {
        "cat": "Indian", "veg": True, "time": "35 min", "serves": 4, "diff": "Easy",
        "cal": 182, "p": 10, "f": 4, "c": 26, "fi": 8, "na": 380,
        "desc": "Comforting yellow lentil soup tempered with aromatic spices.",
        "ingredients": [
            {"name": "Toor Dal",          "qty": "1 cup (200g dry)", "cal": 686, "p": 44, "f": 2,  "c": 124},
            {"name": "Ghee",              "qty": "2 tbsp",           "cal": 252, "p": 0,  "f": 28, "c": 0},
            {"name": "Cumin Seeds",       "qty": "1 tsp",            "cal": 8,   "p": 0,  "f": 0,  "c": 1},
            {"name": "Garlic",            "qty": "3 cloves",         "cal": 13,  "p": 1,  "f": 0,  "c": 3},
            {"name": "Dried Red Chillies","qty": "2 pieces",         "cal": 10,  "p": 0,  "f": 0,  "c": 2},
            {"name": "Tomato",            "qty": "1 medium",         "cal": 22,  "p": 1,  "f": 0,  "c": 5},
            {"name": "Turmeric",          "qty": "1/2 tsp",          "cal": 5,   "p": 0,  "f": 0,  "c": 1},
        ],
        "steps": [
            {"t": "Wash & Soak Dal",      "d": "Rinse toor dal 2-3 times. Soak 20 minutes."},
            {"t": "Pressure Cook",        "d": "Cook dal with water, tomato, turmeric and salt. 3 whistles. Dal should be fully soft."},
            {"t": "Adjust Consistency",   "d": "Mash dal with a ladle. Simmer 5 minutes."},
            {"t": "Make the Tadka",       "d": "Heat ghee. Add cumin seeds until they sizzle. Add garlic slices 30 sec. Add chillies. Turn off heat."},
            {"t": "Add Chilli Powder",    "d": "Away from flame, add red chilli powder to hot ghee — it blooms the spice."},
            {"t": "Combine & Serve",      "d": "Pour sizzling tadka directly onto dal. Stir once. Garnish with coriander. Serve with roti or rice."},
        ]
    },
    "Chicken Biryani": {
        "cat": "Indian", "veg": False, "time": "90 min", "serves": 4, "diff": "Hard",
        "cal": 370, "p": 27, "f": 13, "c": 38, "fi": 2, "na": 610,
        "desc": "Fragrant slow-cooked layered rice and chicken — the crown jewel of Indian cuisine.",
        "ingredients": [
            {"name": "Chicken (bone-in)", "qty": "500g",              "cal": 835,  "p": 90, "f": 50, "c": 0},
            {"name": "Basmati Rice",      "qty": "2 cups (370g dry)", "cal": 1351, "p": 26, "f": 4,  "c": 296},
            {"name": "Onion",             "qty": "2 large",           "cal": 120,  "p": 3,  "f": 0,  "c": 27},
            {"name": "Yogurt",            "qty": "1 cup",             "cal": 147,  "p": 8,  "f": 4,  "c": 20},
            {"name": "Ghee",              "qty": "3 tbsp",            "cal": 372,  "p": 0,  "f": 42, "c": 0},
            {"name": "Biryani Masala",    "qty": "2 tsp",             "cal": 22,   "p": 1,  "f": 1,  "c": 3},
            {"name": "Saffron + Milk",    "qty": "few strands",       "cal": 10,   "p": 0,  "f": 0,  "c": 2},
            {"name": "Mint Leaves",       "qty": "1/2 cup",           "cal": 15,   "p": 1,  "f": 0,  "c": 3},
        ],
        "steps": [
            {"t": "Soak Rice",            "d": "Wash basmati 3 times. Soak 30 minutes. Essential for separate grains."},
            {"t": "Fry the Onions",       "d": "Fry sliced onions 20-25 min until deep golden and crispy. Drain well."},
            {"t": "Marinate Chicken",     "d": "Mix yogurt, spices and fried onions. Marinate chicken 1 hour minimum."},
            {"t": "Cook Chicken",         "d": "Cook marinated chicken in ghee until 80% done and masala is thick."},
            {"t": "Par-cook Rice",        "d": "Boil salted water with whole spices. Cook rice until 70% done. Drain."},
            {"t": "Layer & Dum Cook",     "d": "Layer rice over chicken. Drizzle saffron milk, add mint and ghee. Seal tight. Cook high 2 min then lowest flame 20 min."},
            {"t": "Rest & Serve",         "d": "Rest 5 minutes. Mix gently from bottom. Serve with raita."},
        ]
    },
    "Palak Paneer": {
        "cat": "Indian", "veg": True, "time": "40 min", "serves": 4, "diff": "Medium",
        "cal": 192, "p": 10, "f": 13, "c": 9, "fi": 3, "na": 390,
        "desc": "Velvety spinach curry with soft paneer cubes — packed with iron and protein.",
        "ingredients": [
            {"name": "Fresh Spinach",   "qty": "400g",     "cal": 92,  "p": 12, "f": 0,  "c": 16},
            {"name": "Paneer",          "qty": "250g",     "cal": 663, "p": 45, "f": 53, "c": 5},
            {"name": "Onion",           "qty": "1 large",  "cal": 72,  "p": 2,  "f": 0,  "c": 16},
            {"name": "Tomatoes",        "qty": "2 medium", "cal": 43,  "p": 2,  "f": 0,  "c": 10},
            {"name": "Garlic",          "qty": "3 cloves", "cal": 13,  "p": 1,  "f": 0,  "c": 3},
            {"name": "Oil or Ghee",     "qty": "2 tbsp",   "cal": 248, "p": 0,  "f": 28, "c": 0},
            {"name": "Cream",           "qty": "1/4 cup",  "cal": 204, "p": 1,  "f": 21, "c": 2},
            {"name": "Garam Masala",    "qty": "1 tsp",    "cal": 11,  "p": 0,  "f": 1,  "c": 2},
        ],
        "steps": [
            {"t": "Blanch the Spinach", "d": "Blanch spinach 2 minutes. Immediately transfer to ice water. Blend smooth."},
            {"t": "Pan-fry Paneer",     "d": "Fry paneer cubes until light golden. Soak in warm salted water to keep soft."},
            {"t": "Cook the Masala",    "d": "Saute onions 8-10 min until golden. Add garlic-ginger, tomato puree and spices. Cook until oil separates."},
            {"t": "Combine Spinach",    "d": "Add spinach puree to masala. Simmer 5 minutes."},
            {"t": "Add Paneer",         "d": "Gently fold in paneer. Add garam masala and cream. Simmer 3 min. Serve with roti."},
        ]
    },
    "Scrambled Eggs": {
        "cat": "Continental", "veg": False, "time": "8 min", "serves": 1, "diff": "Easy",
        "cal": 220, "p": 15, "f": 17, "c": 2, "fi": 0, "na": 200,
        "desc": "Silky, creamy scrambled eggs — the perfect high-protein breakfast.",
        "ingredients": [
            {"name": "Eggs",          "qty": "3 large", "cal": 234, "p": 18, "f": 15, "c": 3},
            {"name": "Butter",        "qty": "1 tbsp",  "cal": 100, "p": 0,  "f": 11, "c": 0},
            {"name": "Cream or Milk", "qty": "1 tbsp",  "cal": 20,  "p": 0,  "f": 2,  "c": 0},
        ],
        "steps": [
            {"t": "Crack Eggs Cold",    "d": "Crack eggs into cold pan. Add butter. Starting cold = creamy custardy eggs."},
            {"t": "Stir on Medium",     "d": "Stir constantly with spatula, moving eggs from edges to center."},
            {"t": "On & Off Heat",      "d": "Move pan on and off heat every 30 seconds. Remove when underdone and keep stirring."},
            {"t": "Season & Serve",     "d": "When just barely set and still glossy, remove from heat. Season. Stir in cream. Plate immediately."},
        ]
    },
    "Pad Thai": {
        "cat": "Thai", "veg": False, "time": "25 min", "serves": 2, "diff": "Medium",
        "cal": 350, "p": 19, "f": 11, "c": 44, "fi": 2, "na": 780,
        "desc": "Thailand's famous stir-fried rice noodles with tamarind, eggs and peanuts.",
        "ingredients": [
            {"name": "Rice Noodles",    "qty": "200g",    "cal": 728, "p": 14, "f": 2,  "c": 162},
            {"name": "Shrimp/Chicken",  "qty": "200g",    "cal": 170, "p": 40, "f": 2,  "c": 0},
            {"name": "Eggs",            "qty": "2 large", "cal": 156, "p": 12, "f": 10, "c": 2},
            {"name": "Bean Sprouts",    "qty": "100g",    "cal": 31,  "p": 3,  "f": 0,  "c": 6},
            {"name": "Fish Sauce",      "qty": "3 tbsp",  "cal": 12,  "p": 2,  "f": 0,  "c": 1},
            {"name": "Tamarind Paste",  "qty": "2 tbsp",  "cal": 72,  "p": 1,  "f": 0,  "c": 19},
            {"name": "Peanuts Roasted", "qty": "30g",     "cal": 170, "p": 8,  "f": 15, "c": 5},
        ],
        "steps": [
            {"t": "Soak Noodles",   "d": "Soak noodles in room temperature water 30 min. Do NOT boil. Drain."},
            {"t": "Mix Sauce",      "d": "Combine fish sauce, tamarind and sugar. Balance sour, salty, sweet."},
            {"t": "Wok on High",    "d": "Smoking hot wok. Fry protein 2-3 min. Push to side."},
            {"t": "Scramble Eggs",  "d": "Add eggs to empty side. Scramble. Mix with protein."},
            {"t": "Toss & Serve",   "d": "Add noodles and sauce. Toss 2 min. Add sprouts. Top with peanuts and lime."},
        ]
    },
    "Ramen": {
        "cat": "Japanese", "veg": False, "time": "30 min", "serves": 2, "diff": "Medium",
        "cal": 436, "p": 20, "f": 14, "c": 54, "fi": 2, "na": 1260,
        "desc": "Rich Japanese noodle soup with soft egg, chashu and flavoured broth.",
        "ingredients": [
            {"name": "Ramen Noodles",   "qty": "2 packs (180g)", "cal": 660, "p": 20, "f": 10, "c": 124},
            {"name": "Chicken Broth",   "qty": "4 cups (960ml)", "cal": 80,  "p": 12, "f": 4,  "c": 4},
            {"name": "Soy Sauce",       "qty": "3 tbsp",         "cal": 16,  "p": 2,  "f": 0,  "c": 2},
            {"name": "Miso Paste",      "qty": "2 tbsp",         "cal": 72,  "p": 4,  "f": 2,  "c": 10},
            {"name": "Eggs",            "qty": "2 large",        "cal": 156, "p": 12, "f": 10, "c": 2},
            {"name": "Chashu Pork",     "qty": "100g",           "cal": 250, "p": 20, "f": 18, "c": 0},
            {"name": "Spring Onions",   "qty": "2 stalks",       "cal": 10,  "p": 0,  "f": 0,  "c": 2},
            {"name": "Sesame Oil",      "qty": "1 tsp",          "cal": 44,  "p": 0,  "f": 5,  "c": 0},
        ],
        "steps": [
            {"t": "Soft-boil Eggs",   "d": "Boil eggs 6.5 minutes. Ice bath. Peel and marinate in soy sauce and mirin."},
            {"t": "Prepare Broth",    "d": "Heat broth. Whisk in soy sauce and miso until dissolved. Never boil miso."},
            {"t": "Cook Noodles",     "d": "Cook noodles separately per package. Drain into bowls."},
            {"t": "Build the Bowl",   "d": "Pour hot broth over noodles. Add butter and sesame oil."},
            {"t": "Add Toppings",     "d": "Halve egg, arrange chashu and nori. Scatter spring onions. Eat immediately."},
        ]
    },
    "Green Curry": {
        "cat": "Thai", "veg": False, "time": "30 min", "serves": 4, "diff": "Medium",
        "cal": 280, "p": 17, "f": 18, "c": 12, "fi": 2, "na": 610,
        "desc": "Fragrant Thai green curry with coconut milk and fresh herbs.",
        "ingredients": [
            {"name": "Chicken Breast",      "qty": "400g",   "cal": 480, "p": 92, "f": 12, "c": 0},
            {"name": "Coconut Milk",        "qty": "400ml",  "cal": 920, "p": 9,  "f": 96, "c": 24},
            {"name": "Green Curry Paste",   "qty": "3 tbsp", "cal": 75,  "p": 3,  "f": 5,  "c": 8},
            {"name": "Fish Sauce",          "qty": "2 tbsp", "cal": 8,   "p": 1,  "f": 0,  "c": 1},
            {"name": "Thai Basil",          "qty": "handful","cal": 5,   "p": 0,  "f": 0,  "c": 1},
            {"name": "Kaffir Lime Leaves",  "qty": "4 leaves","cal": 5,  "p": 0,  "f": 0,  "c": 1},
        ],
        "steps": [
            {"t": "Fry Paste",        "d": "Fry curry paste in thick coconut cream until fragrant and darkened."},
            {"t": "Add Chicken",      "d": "Stir-fry chicken 3 min until sealed."},
            {"t": "Add Coconut Milk", "d": "Pour remaining coconut milk. Add aromatics, fish sauce and sugar. Simmer 8-10 min."},
            {"t": "Finish",           "d": "Add vegetables. Cook 5 min. Stir in Thai basil. Serve with jasmine rice."},
        ]
    },
    "Shakshuka": {
        "cat": "Mediterranean", "veg": True, "time": "25 min", "serves": 2, "diff": "Easy",
        "cal": 198, "p": 11, "f": 13, "c": 10, "fi": 3, "na": 480,
        "desc": "Eggs poached in spiced tomato and pepper sauce — a Middle Eastern breakfast classic.",
        "ingredients": [
            {"name": "Eggs",           "qty": "4 large", "cal": 312, "p": 24, "f": 20, "c": 4},
            {"name": "Canned Tomatoes","qty": "400g",    "cal": 80,  "p": 4,  "f": 0,  "c": 16},
            {"name": "Bell Peppers",   "qty": "2 medium","cal": 93,  "p": 3,  "f": 1,  "c": 18},
            {"name": "Onion",          "qty": "1 medium","cal": 60,  "p": 2,  "f": 0,  "c": 14},
            {"name": "Garlic",         "qty": "4 cloves","cal": 18,  "p": 1,  "f": 0,  "c": 4},
            {"name": "Olive Oil",      "qty": "2 tbsp",  "cal": 248, "p": 0,  "f": 28, "c": 0},
            {"name": "Cumin",          "qty": "1 tsp",   "cal": 8,   "p": 0,  "f": 0,  "c": 1},
            {"name": "Paprika",        "qty": "1 tsp",   "cal": 6,   "p": 0,  "f": 0,  "c": 1},
        ],
        "steps": [
            {"t": "Build Sauce",      "d": "Saute onion 5 min. Add peppers 5 min. Add garlic, cumin, paprika. Add tomatoes. Simmer 10 min."},
            {"t": "Create Wells",     "d": "Make 4 wells in the sauce. Crack eggs into wells."},
            {"t": "Poach Eggs",       "d": "Cover and cook 5-8 min. Yolks should be just set but still soft."},
            {"t": "Serve",            "d": "Scatter feta and herbs. Serve with crusty bread for scooping."},
        ]
    },
    "Margherita Pizza": {
        "cat": "Italian", "veg": True, "time": "30 min", "serves": 2, "diff": "Medium",
        "cal": 800, "p": 35, "f": 28, "c": 100, "fi": 4, "na": 1600,
        "desc": "The original Neapolitan pizza — tomatoes, fresh mozzarella, basil.",
        "ingredients": [
            {"name": "Pizza Dough",      "qty": "250g",    "cal": 665, "p": 18, "f": 7,  "c": 130},
            {"name": "Tomato Sauce",     "qty": "3 tbsp",  "cal": 35,  "p": 2,  "f": 0,  "c": 8},
            {"name": "Fresh Mozzarella", "qty": "150g",    "cal": 420, "p": 42, "f": 26, "c": 5},
            {"name": "Fresh Basil",      "qty": "handful", "cal": 5,   "p": 0,  "f": 0,  "c": 1},
            {"name": "Olive Oil",        "qty": "1 tbsp",  "cal": 124, "p": 0,  "f": 14, "c": 0},
        ],
        "steps": [
            {"t": "Preheat Oven",       "d": "Set oven to max 250-280 degrees. Put baking tray inside to preheat."},
            {"t": "Stretch Dough",      "d": "Rest dough at room temp 30 min. Press from center outward — never use a rolling pin."},
            {"t": "Apply Sauce",        "d": "Spread thin layer of sauce leaving 1.5cm border."},
            {"t": "Add Cheese & Bake",  "d": "Tear mozzarella into chunks. Drizzle oil. Bake 8-12 min until golden."},
            {"t": "Finish & Serve",     "d": "Add fresh basil immediately out of oven. Drizzle oil. Rest 2 min before slicing."},
        ]
    },
    "Bibimbap": {
        "cat": "Korean", "veg": False, "time": "45 min", "serves": 2, "diff": "Medium",
        "cal": 490, "p": 22, "f": 12, "c": 72, "fi": 6, "na": 860,
        "desc": "Mixed rice bowl with seasoned vegetables, beef and gochujang sauce.",
        "ingredients": [
            {"name": "Steamed Rice",    "qty": "2 cups cooked", "cal": 481, "p": 9,  "f": 1,  "c": 106},
            {"name": "Beef Minced",     "qty": "200g",          "cal": 436, "p": 52, "f": 24, "c": 0},
            {"name": "Spinach",         "qty": "100g blanched", "cal": 23,  "p": 3,  "f": 0,  "c": 4},
            {"name": "Bean Sprouts",    "qty": "100g",          "cal": 31,  "p": 3,  "f": 0,  "c": 6},
            {"name": "Carrot",          "qty": "1 medium",      "cal": 41,  "p": 1,  "f": 0,  "c": 10},
            {"name": "Egg",             "qty": "2 large",       "cal": 156, "p": 12, "f": 10, "c": 2},
            {"name": "Gochujang",       "qty": "2 tbsp",        "cal": 50,  "p": 1,  "f": 1,  "c": 10},
            {"name": "Sesame Oil",      "qty": "2 tbsp",        "cal": 88,  "p": 0,  "f": 10, "c": 0},
        ],
        "steps": [
            {"t": "Cook Beef",          "d": "Season beef with soy sauce, sesame oil, garlic, sugar. Stir-fry on high 3-4 min."},
            {"t": "Prep Vegetables",    "d": "Blanch spinach 30 sec, squeeze dry, season. Saute carrot and bean sprouts separately."},
            {"t": "Make Sauce",         "d": "Mix gochujang, sesame oil, vinegar and sugar. Adjust spice level."},
            {"t": "Fry Eggs",           "d": "Fry eggs sunny-side up. The runny yolk mixes everything when stirred."},
            {"t": "Assemble & Mix",     "d": "Add rice to hot bowl. Arrange all toppings in sections. Top with egg. Add gochujang sauce. Mix vigorously before eating."},
        ]
    },
    "Chicken Tacos": {
        "cat": "Mexican", "veg": False, "time": "30 min", "serves": 4, "diff": "Easy",
        "cal": 226, "p": 17, "f": 10, "c": 18, "fi": 2, "na": 480,
        "desc": "Juicy lime-marinated chicken in warm corn tortillas with fresh salsa.",
        "ingredients": [
            {"name": "Chicken Thighs",   "qty": "500g",    "cal": 885, "p": 95, "f": 55, "c": 0},
            {"name": "Corn Tortillas",   "qty": "8 small", "cal": 400, "p": 8,  "f": 8,  "c": 80},
            {"name": "Lime Juice",       "qty": "3 tbsp",  "cal": 12,  "p": 0,  "f": 0,  "c": 4},
            {"name": "Avocado",          "qty": "2 ripe",  "cal": 480, "p": 6,  "f": 44, "c": 26},
            {"name": "Fresh Salsa",      "qty": "1/2 cup", "cal": 30,  "p": 1,  "f": 0,  "c": 6},
            {"name": "Cumin",            "qty": "1 tsp",   "cal": 8,   "p": 0,  "f": 0,  "c": 1},
        ],
        "steps": [
            {"t": "Marinate Chicken",   "d": "Mix lime juice, cumin, chilli powder, garlic and oil. Marinate chicken 20 min."},
            {"t": "Cook Chicken",       "d": "Grill or pan-cook on high 5-6 min per side until caramelized. Rest 5 min then slice."},
            {"t": "Make Guacamole",     "d": "Mash avocado with lime, salt and coriander. Keep chunky."},
            {"t": "Warm Tortillas",     "d": "Char directly on gas flame or dry pan 30 sec per side."},
            {"t": "Assemble & Serve",   "d": "Fill with chicken, salsa, guac and coriander. Serve with lime."},
        ]
    },
    "Pasta Carbonara": {
        "cat": "Italian", "veg": False, "time": "20 min", "serves": 2, "diff": "Medium",
        "cal": 433, "p": 19, "f": 19, "c": 48, "fi": 2, "na": 630,
        "desc": "Silky Roman pasta with eggs, pecorino and guanciale — no cream.",
        "ingredients": [
            {"name": "Spaghetti",       "qty": "200g dry",  "cal": 742, "p": 26, "f": 4,  "c": 150},
            {"name": "Guanciale",       "qty": "150g diced","cal": 522, "p": 24, "f": 47, "c": 0},
            {"name": "Eggs + Yolks",    "qty": "3+2",       "cal": 390, "p": 30, "f": 27, "c": 5},
            {"name": "Pecorino Romano", "qty": "80g grated","cal": 316, "p": 24, "f": 24, "c": 1},
            {"name": "Black Pepper",    "qty": "2 tsp",     "cal": 10,  "p": 0,  "f": 0,  "c": 2},
        ],
        "steps": [
            {"t": "Cook Pasta",         "d": "Boil in salted water, 1 min less than al dente. Reserve 1 cup pasta water."},
            {"t": "Render Guanciale",   "d": "Cook guanciale in cold pan on medium-low until crispy. Keep fat."},
            {"t": "Make Egg Mixture",   "d": "Whisk whole eggs, yolks, pecorino and lots of black pepper."},
            {"t": "The Critical Step",  "d": "Remove pan from heat. Add hot pasta to fat. Toss. Add egg mixture, tossing constantly. Add pasta water tablespoon by tablespoon until creamy."},
            {"t": "Serve",              "d": "Add guanciale back. Plate immediately with more pecorino."},
        ]
    },
    "Oatmeal": {
        "cat": "Continental", "veg": True, "time": "10 min", "serves": 1, "diff": "Easy",
        "cal": 320, "p": 12, "f": 8, "c": 46, "fi": 6, "na": 120,
        "desc": "Creamy rolled oats — the ultimate high-fiber breakfast.",
        "ingredients": [
            {"name": "Rolled Oats",   "qty": "1/2 cup (45g)","cal": 175, "p": 8, "f": 3, "c": 30},
            {"name": "Milk",          "qty": "1 cup (240ml)", "cal": 146, "p": 8, "f": 8, "c": 11},
            {"name": "Banana",        "qty": "1/2 medium",    "cal": 45,  "p": 0, "f": 0, "c": 11},
            {"name": "Peanut Butter", "qty": "1 tbsp",        "cal": 94,  "p": 4, "f": 8, "c": 3},
            {"name": "Honey",         "qty": "1 tsp",         "cal": 21,  "p": 0, "f": 0, "c": 6},
        ],
        "steps": [
            {"t": "Cook Oats",        "d": "Combine oats, milk and salt. Bring to boil, reduce heat. Stir 3-5 min until thickened."},
            {"t": "Sweeten",          "d": "Remove from heat. Stir in honey."},
            {"t": "Add Toppings",     "d": "Transfer to bowl. Add banana, peanut butter and chia seeds. Serve immediately."},
        ]
    },
    "Kung Pao Chicken": {
        "cat": "Chinese", "veg": False, "time": "25 min", "serves": 2, "diff": "Medium",
        "cal": 350, "p": 30, "f": 18, "c": 16, "fi": 2, "na": 820,
        "desc": "Spicy, sweet Sichuan chicken with peanuts and dried chillies.",
        "ingredients": [
            {"name": "Chicken Breast",   "qty": "400g diced", "cal": 480, "p": 92, "f": 12, "c": 0},
            {"name": "Dried Chillies",   "qty": "6-8",        "cal": 30,  "p": 1,  "f": 1,  "c": 6},
            {"name": "Peanuts Roasted",  "qty": "50g",        "cal": 283, "p": 13, "f": 25, "c": 8},
            {"name": "Soy Sauce",        "qty": "3 tbsp",     "cal": 16,  "p": 2,  "f": 0,  "c": 2},
            {"name": "Rice Vinegar",     "qty": "1.5 tbsp",   "cal": 4,   "p": 0,  "f": 0,  "c": 1},
            {"name": "Hoisin Sauce",     "qty": "1 tbsp",     "cal": 35,  "p": 1,  "f": 1,  "c": 7},
        ],
        "steps": [
            {"t": "Marinate Chicken",   "d": "Toss chicken with soy sauce and cornstarch. Rest 15 min."},
            {"t": "Make Sauce",         "d": "Mix soy sauce, rice vinegar, hoisin, sugar and cornstarch slurry."},
            {"t": "Fry Chillies",       "d": "Fry dried chillies in hot oil 30 sec until darkened. Infuses oil with heat."},
            {"t": "Stir-fry Chicken",   "d": "Cook marinated chicken on high heat 4 min until done."},
            {"t": "Finish",             "d": "Add garlic, ginger 30 sec. Pour in sauce. Toss everything. Add peanuts."},
        ]
    },
    "Teriyaki Chicken Bowl": {
        "cat": "Japanese", "veg": False, "time": "25 min", "serves": 2, "diff": "Easy",
        "cal": 460, "p": 38, "f": 9, "c": 52, "fi": 2, "na": 820,
        "desc": "Juicy glazed chicken thighs over steamed rice with teriyaki sauce.",
        "ingredients": [
            {"name": "Chicken Thighs boneless","qty": "400g",          "cal": 708, "p": 76, "f": 44, "c": 0},
            {"name": "Steamed Rice",           "qty": "1.5 cups cooked","cal": 364, "p": 7,  "f": 1,  "c": 80},
            {"name": "Soy Sauce",              "qty": "3 tbsp",         "cal": 16,  "p": 2,  "f": 0,  "c": 2},
            {"name": "Mirin",                  "qty": "3 tbsp",         "cal": 60,  "p": 0,  "f": 0,  "c": 14},
            {"name": "Sugar",                  "qty": "1 tbsp",         "cal": 48,  "p": 0,  "f": 0,  "c": 13},
            {"name": "Sesame Seeds",           "qty": "1 tsp",          "cal": 18,  "p": 1,  "f": 2,  "c": 1},
        ],
        "steps": [
            {"t": "Make Sauce",   "d": "Mix soy sauce, mirin, sake and sugar until sugar dissolves."},
            {"t": "Cook Chicken", "d": "Sear chicken skin-side down 5-6 min until golden. Flip."},
            {"t": "Glaze",        "d": "Pour sauce over chicken. Cook 4-5 min basting continuously until caramelized."},
            {"t": "Slice & Serve","d": "Rest 5 min, slice. Serve over rice with sesame seeds and spring onions."},
        ]
    },
}
