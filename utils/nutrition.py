def scale_nutrition(base: dict, qty: float) -> dict:
    return {
        "cal": round(base.get("cal", 0) * qty),
        "p":   round(base.get("p",   0) * qty, 1),
        "f":   round(base.get("f",   0) * qty, 1),
        "c":   round(base.get("c",   0) * qty, 1),
        "fi":  round(base.get("fi",  0) * qty, 1),
        "na":  round(base.get("na",  0) * qty),
    }

def sum_nutrition(items: list) -> dict:
    totals = {"cal": 0, "p": 0.0, "f": 0.0, "c": 0.0, "fi": 0.0, "na": 0}
    for item in items:
        n = item.get("n", item.get("nutrition", {}))
        totals["cal"] += n.get("cal", 0)
        totals["p"]   += n.get("p",   0)
        totals["f"]   += n.get("f",   0)
        totals["c"]   += n.get("c",   0)
        totals["fi"]  += n.get("fi",  0)
        totals["na"]  += n.get("na",  0)
    return totals

def macro_percentages(p: float, c: float, f: float) -> dict:
    cal_from_protein = p * 4
    cal_from_carbs   = c * 4
    cal_from_fat     = f * 9
    total = cal_from_protein + cal_from_carbs + cal_from_fat
    if total == 0:
        return {"protein_pct": 33, "carbs_pct": 34, "fat_pct": 33}
    return {
        "protein_pct": round((cal_from_protein / total) * 100),
        "carbs_pct":   round((cal_from_carbs   / total) * 100),
        "fat_pct":     round((cal_from_fat     / total) * 100),
    }

def progress_pct(current: float, goal: float) -> float:
    if goal <= 0:
        return 0.0
    return min((current / goal) * 100, 100.0)

def items_by_meal(log: list) -> dict:
    grouped = {}
    for item in log:
        meal = item.get("meal", "Snack")
        grouped.setdefault(meal, []).append(item)
    return grouped
