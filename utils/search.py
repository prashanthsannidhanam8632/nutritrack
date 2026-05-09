def filter_dishes(dishes, category="All", veg_filter=None, search=""):
    results = []
    for name, d in dishes.items():
        if category != "All" and d.get("cat") != category:
            continue
        if veg_filter is not None and d.get("veg") != veg_filter:
            continue
        if search and search.lower() not in name.lower():
            continue
        results.append((name, d))
    return results

def filter_ingredients(ingredients, category="All", search=""):
    results = []
    for name, d in ingredients.items():
        if category != "All" and d.get("cat") != category:
            continue
        if search and search.lower() not in name.lower():
            continue
        results.append((name, d))
    return results

def filter_recipes(recipes, category="All", veg_filter=None, search=""):
    results = []
    for name, r in recipes.items():
        if category != "All" and r.get("cat") != category:
            continue
        if veg_filter is not None and r.get("veg") != veg_filter:
            continue
        if search and search.lower() not in name.lower():
            continue
        results.append((name, r))
    return results

def get_categories(database):
    cats = sorted(set(d.get("cat", "Other") for d in database.values()))
    return ["All"] + cats
