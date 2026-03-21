import { MealOption } from '../types/plan';

export const mockMealOptions: Record<string, MealOption[]> = {
  breakfast: [
    {
      id: 'b1',
      label: 'A',
      name: 'Eggs + bread',
      description: '3 whole eggs + 2 multigrain bread slices + 1 banana',
      items: ['3 whole eggs', '2 multigrain bread slices', '1 banana'],
      kcal: 480,
      prepMinutes: 10,
      tags: ['high-protein', 'easy'],
      isDefault: true,
      howToPrepare: [
        'Toast 2 slices of multigrain bread until golden brown.',
        'Crack 3 whole eggs into a bowl, season with salt and pepper, and whisk well.',
        'Heat a non-stick pan with a drop of oil or butter, pour in the eggs, and scramble until soft.',
        'Serve the eggs over the toast and slice 1 banana on the side.'
      ],
      benefits: [
        'High protein keeps you full till lunch',
        'Complex carbs for steady energy all morning',
        'Banana adds potassium and natural sugar',
      ],
      bestFor: 'Weekdays when you\'re in a rush. Ready in under 10 minutes.',
    },
    {
      id: 'b2',
      label: 'B',
      name: 'Oats bowl',
      description: '1 cup rolled oats in milk + 1 tbsp peanut butter + 1 banana',
      items: ['1 cup rolled oats', '1 cup milk', '1 tbsp peanut butter', '1 banana'],
      kcal: 460,
      prepMinutes: 8,
      tags: ['filling', 'easy'],
      howToPrepare: [
        'Pour 1 cup of oats into a bowl and add 1 cup of warm or cold milk.',
        'Stir in 1 tablespoon of peanut butter until well mixed.',
        'Chop 1 banana and layer it on top.',
        'Let it sit for a few minutes to soften before eating.'
      ],
      benefits: [
        'Oats are high in soluble fibre — reduces cholesterol',
        'Peanut butter adds healthy fats and protein',
        'Keeps you full longer than bread',
      ],
      bestFor: 'When you have 8 minutes. Can be made the night before.',
    },
    {
      id: 'b3',
      label: 'C',
      name: 'Poha + eggs',
      description: '2 cups poha with peanuts and veggies + 2 boiled eggs on the side',
      items: ['2 cups poha', '2 boiled eggs', 'peanuts', 'vegetables', 'mustard seeds', 'curry leaves'],
      kcal: 450,
      prepMinutes: 15,
      tags: ['indian', 'filling'],
      howToPrepare: [
        'Wash 2 cups of poha in a colander and set aside.',
        'Heat oil in a pan, add mustard seeds, curry leaves, chopped onions, and veggies.',
        'Sauté peanuts until crunchy.',
        'Add the softened poha, turmeric, and salt. Mix well and cook for 3-4 mins.',
        'Boil 2 eggs on the side and serve together.'
      ],
      benefits: [
        'Poha is light and easy to digest',
        'Iron-rich when made with curry leaves',
        'Peanuts add protein and crunch',
      ],
      bestFor: 'Weekends or when you have 15 minutes. Familiar taste.',
    },
    {
      id: 'b4',
      label: 'D',
      name: 'Tawa paratha',
      description: '2 aloo/gobhi parathas (tawa only, no butter) + 1 cup dahi',
      items: ['2 parathas (aloo or gobhi)', '1 cup dahi', 'pickle (small)'],
      kcal: 480,
      prepMinutes: 20,
      tags: ['indian', 'weekend-preferred'],
      howToPrepare: [
        'Knead wheat flour into a soft dough.',
        'Prepare the mashed potato or cauliflower stuffing with spices.',
        'Roll the dough into flatbreads, placing the stuffing inside.',
        'Roast on a hot tawa (griddle) until both sides are cooked (avoid butter).',
        'Serve hot with a cup of fresh dahi and a tiny bit of pickle.'
      ],
      benefits: [
        'Satisfying and filling — good for heavier mornings',
        'Dahi adds probiotics for gut health',
        'No butter keeps calories in check',
      ],
      bestFor: 'Weekends when you have time to cook. Not ideal for rushed weekdays.',
    },
    {
      id: 'b5',
      label: 'E',
      name: 'Dalia + eggs',
      description: '1.5 cups cooked dalia with milk or veggies + 2 boiled eggs',
      items: ['1.5 cups dalia (broken wheat)', 'milk or vegetables', '2 boiled eggs'],
      kcal: 430,
      prepMinutes: 15,
      tags: ['high-fiber', 'indian'],
      howToPrepare: [
        'Dry roast dalia in a pan for 2 minutes until fragrant.',
        'Boil with milk or water and chopped veggies until soft and porridge-like.',
        'On a separate burner, boil 2 eggs to your preferred doneness.',
        'Serve the warm dalia alongside the peeled boiled eggs.'
      ],
      benefits: [
        'Dalia is a slow-digesting grain — great for blood sugar',
        'High fibre aids digestion and reduces bloating',
        'Lowest calorie option — good if you had a heavy dinner',
      ],
      bestFor: 'Days after a heavy dinner. Gives your gut a break.',
    },
  ],

  morningSnack: [
    {
      id: 's1', label: 'A', name: 'Roasted chana',
      description: '100–120g pack. Easy to carry in bag.',
      items: ['100g roasted chana'],
      kcal: 120, prepMinutes: 0, tags: ['carry-friendly'],
      isDefault: true,
      howToPrepare: [
        'No preparation needed.',
        'Measure out 100g or grab a pre-packaged handful.',
        'Enjoy.'
      ],
      benefits: ['High protein for a snack', 'Slow-digesting — no sugar spike', 'Cheap and widely available'],
      bestFor: 'Every weekday. Keep a pack in your bag at all times.',
    },
    {
      id: 's2', label: 'B', name: 'Banana',
      description: '1 medium banana. Quick and natural.',
      items: ['1 medium banana'],
      kcal: 90, prepMinutes: 0, tags: ['carry-friendly', 'quick'],
      howToPrepare: [
        'No prep required. Just peel and eat.'
      ],
      benefits: ['Fast energy', 'High potassium', 'Natural sugar — no crash'],
      bestFor: 'When you only have 10 seconds. Best pre-snack between classes.',
    },
    {
      id: 's3', label: 'C', name: 'Mixed nuts',
      description: 'Small handful (25g) — almonds, cashews, walnuts.',
      items: ['25g mixed nuts (almonds, cashews, walnuts)'],
      kcal: 150, prepMinutes: 0, tags: ['carry-friendly'],
      howToPrepare: [
        'Measure out exactly 25g (about a small handful) to avoid overeating calories.'
      ],
      benefits: ['Healthy fats support brain function', 'No sugar — stable energy', 'Portable, no prep'],
      bestFor: 'Office afternoons. Keep a small box in your drawer.',
    },
    {
      id: 's4', label: 'D', name: 'Boiled egg',
      description: '1 boiled egg. Prep the night before.',
      items: ['1 boiled egg'],
      kcal: 70, prepMinutes: 0, tags: ['high-protein'],
      howToPrepare: [
        'Place egg in boiling water for 8-10 minutes.',
        'Transfer to an ice bath, peel, and pack it in a small container.',
        'Sprinkle an optional pinch of salt or pepper.'
      ],
      benefits: ['Highest protein-to-calorie ratio of any snack', 'Zero sugar', 'Very filling'],
      bestFor: 'When you boil eggs the night before. Plan ahead.',
    },
    {
      id: 's5', label: 'E', name: 'Seasonal fruit',
      description: '1 apple, guava, or pear.',
      items: ['1 apple or guava or pear'],
      kcal: 80, prepMinutes: 0, tags: ['carry-friendly', 'hydrating'],
      howToPrepare: [
        'Wash the fruit thoroughly.',
        'Slice into wedges (if an apple or pear) and place in a container, or eat whole.'
      ],
      benefits: ['High fibre and water content', 'Seasonal variety is good', 'Natural sugar with fibre slows digestion'],
      bestFor: 'When you want something light and fresh. Works any season.',
    },
  ],

  lunch: [
    {
      id: 'l1', label: 'A', name: 'Dal + roti',
      description: '2 rotis + 1 bowl dal + 1 cup sabji + 1 cup dahi',
      items: ['2 rotis', '1 bowl dal (any)', '1 cup sabji', '1 cup dahi'],
      kcal: 580, prepMinutes: 0, tags: ['ideal', 'balanced'],
      isDefault: true,
      howToPrepare: [
        'Boil your choice of dal and temper with cumin and mild spices.',
        'Knead fresh dough and cook 2 rotis on a hot tawa.',
        'Sauté a cup of fresh vegetables (sabji) with minimal oil.',
        'Serve the hot meal alongside 1 cup of cold dahi.'
      ],
      benefits: ['Balanced protein, carb, and fat ratio', 'Dahi adds probiotics', 'Classic combination — easy to find anywhere'],
      bestFor: 'Every weekday. Order from canteen or dabba service.',
    },
    {
      id: 'l2', label: 'B', name: 'Chicken + roti',
      description: '2 rotis + 150g chicken curry + 1 cup sabji',
      items: ['2 rotis', '150g chicken curry', '1 cup sabji'],
      kcal: 600, prepMinutes: 0, tags: ['high-protein'],
      howToPrepare: [
        'Marinate 150g chicken in basic spices and yogurt.',
        'Cook in a pan with 1-2 tsp oil until thoroughly cooked and tender.',
        'Make 2 rotis and serve with a side of vegetable sabji.'
      ],
      benefits: ['Highest protein option at lunch', 'Keeps you full through the afternoon', 'Good for muscle maintenance'],
      bestFor: 'Days when you skipped morning snack or had a light breakfast.',
    },
    {
      id: 'l3', label: 'C', name: 'Rajma / Chole',
      description: '1.5 cups rajma or chole + 2 rotis + small salad',
      items: ['1.5 cups rajma or chole', '2 rotis', 'onion-tomato-cucumber salad'],
      kcal: 570, prepMinutes: 0, tags: ['vegetarian', 'high-protein'],
      howToPrepare: [
        'Soak rajma/chole overnight, then pressure cook until soft.',
        'Prepare a tomato-onion masala base, add the beans, and let it simmer.',
        'Make 2 rotis and chop a fresh cucumber-tomato-onion salad.'
      ],
      benefits: ['Plant-based protein — good variety', 'High fibre aids afternoon digestion', 'Filling without feeling heavy'],
      bestFor: 'Good change from dal. Rich and satisfying.',
    },
    {
      id: 'l4', label: 'D', name: 'Rice meal',
      description: '1 cup rice + dal + egg or fish curry + sabji. Once a week.',
      items: ['1 cup rice', 'dal', 'egg curry or fish curry', 'sabji'],
      kcal: 580, prepMinutes: 0, tags: ['once-a-week'],
      howToPrepare: [
        'Steam 1 cup of white or brown rice.',
        'Prepare a light dal and a serving of egg or fish curry.',
        'Combine with your choice of vegetable sabji.'
      ],
      benefits: ['Rice provides quick energy', 'Good for variety', 'Comfortable and familiar'],
      bestFor: 'Once a week maximum. Not on days when you feel heavy or bloated.',
    },
    {
      id: 'l5', label: 'E', name: 'Canteen dabba',
      description: 'Dal-roti or grilled chicken from office canteen or dabba service.',
      items: ['dal-roti or sabji-roti or grilled chicken'],
      kcal: 550, prepMinutes: 0, tags: ['outside', 'flexible'],
      howToPrepare: [
        'No preparation required.',
        'Pick up your meal from the cafeteria or order your Dabba.',
        'Ensure you request less oil if placing a custom order.'
      ],
      benefits: ['Convenient for busy days', 'Avoid fried items', 'Look for dal/roti/grilled options'],
      bestFor: 'Any weekday. Avoid fried and creamy options. Ask for less oil.',
    },
  ],

  eveningSnack: [
    {
      id: 'es1', label: 'A', name: 'Roasted chana + coffee',
      description: 'Small pack of chana, then black coffee.',
      items: ['80g roasted chana', '1 cup black coffee'],
      kcal: 120, prepMinutes: 0, tags: ['carry-friendly'],
      isDefault: true,
      howToPrepare: [
        'Brew a fresh cup of black coffee (no sugar/milk).',
        'Measure out 80g of roasted chana.',
        'Eat the chana before or alongside the coffee.'
      ],
      benefits: ['Protein before coffee reduces cortisol spike', 'Chana keeps you going till 9 PM', 'Coffee at this time is fine'],
      bestFor: 'Every weekday at 4:30 PM. Never coffee on an empty stomach.',
    },
    {
      id: 'es2', label: 'B', name: 'Mixed nuts + coffee',
      description: 'Handful of nuts (25g), then black coffee.',
      items: ['25g mixed nuts', '1 cup black coffee'],
      kcal: 150, prepMinutes: 0, tags: [],
      howToPrepare: [
        'Brew 1 cup of black coffee.',
        'Grab a small handful (25g) of mixed nuts from your stash.'
      ],
      benefits: ['Healthy fats stabilise blood sugar', 'Good brain food for the final office hours', 'Satisfying without being heavy'],
      bestFor: 'When you have nuts in your drawer. Office-friendly.',
    },
    {
      id: 'es3', label: 'C', name: 'Banana + coffee',
      description: '1 banana, then black coffee.',
      items: ['1 banana', '1 cup black coffee'],
      kcal: 90, prepMinutes: 0, tags: ['quick'],
      howToPrepare: [
        'Brew 1 cup of black coffee.',
        'Peel 1 medium banana and enjoy.'
      ],
      benefits: ['Quick energy boost', 'Natural sugar with fibre', 'Easy to grab anywhere'],
      bestFor: 'When you skipped the morning snack and need quick energy.',
    },
  ],

  dinner: [
    {
      id: 'd1', label: 'A', name: 'Roti + sabji',
      description: '2 rotis + any vegetable sabji + 1 bowl dal. Lighter than lunch.',
      items: ['2 rotis', 'vegetable sabji (any)', '1 bowl dal'],
      kcal: 480, prepMinutes: 0, tags: ['ideal', 'light'],
      isDefault: true,
      howToPrepare: [
        'Prepare a light vegetable sabji with minimal oil.',
        'Boil 1 bowl of dal.',
        'Make 2 rotis. Serve hot.'
      ],
      benefits: ['Light enough to digest before sleeping', 'No rice keeps blood sugar stable overnight', 'Classic — available everywhere'],
      bestFor: 'Every weeknight. The standard dinner.',
    },
    {
      id: 'd2', label: 'B', name: 'Chicken / egg',
      description: '2 rotis + 100g grilled chicken or 2-egg bhurji + sabji',
      items: ['2 rotis', '100g chicken or 2-egg bhurji', '1 cup sabji'],
      kcal: 500, prepMinutes: 0, tags: ['high-protein'],
      howToPrepare: [
        'Pan-grill 100g of marinated chicken or scramble 2 eggs into a bhurji.',
        'Make 2 rotis.',
        'Serve with 1 cup of vegetable sabji.'
      ],
      benefits: ['Protein at night supports muscle recovery', 'Good if you exercised today', 'Satisfying without being heavy'],
      bestFor: 'Post-weekend workout days. Or when you need more protein.',
    },
    {
      id: 'd3', label: 'C', name: 'Dal khichdi',
      description: '1.5 cups khichdi (dal + rice) + dahi + papad',
      items: ['1.5 cups khichdi', 'dahi', 'papad'],
      kcal: 460, prepMinutes: 0, tags: ['easy', 'light'],
      howToPrepare: [
        'Mix equal parts dal and rice, wash thoroughly.',
        'Add water, a pinch of turmeric, salt, and pressure cook for 3-4 whistles.',
        'Roast a papad on an open flame.',
        'Serve the hot khichdi with dahi and the roasted papad.'
      ],
      benefits: ['Easiest to digest — good for late nights', 'Complete protein (dal + rice combination)', 'Dahi adds probiotics'],
      bestFor: 'When you reach home past 10:30 PM and feel tired.',
    },
    {
      id: 'd4', label: 'D', name: 'Paneer sabji',
      description: '2 rotis + small portion paneer sabji + salad. No rice.',
      items: ['2 rotis', 'paneer sabji (small portion)', 'salad'],
      kcal: 490, prepMinutes: 0, tags: ['vegetarian'],
      howToPrepare: [
        'Cut paneer into cubes.',
        'Sauté lightly with onions, tomatoes, and minimal spices to keep it light.',
        'Make 2 rotis and chop a fresh side salad.'
      ],
      benefits: ['Paneer provides complete protein', 'Good vegetarian variety', 'Salad adds fibre and volume'],
      bestFor: 'When you want something more satisfying than plain sabji.',
    },
    {
      id: 'd5', label: 'E', name: 'Avoid tonight',
      description: 'Restaurant biryani, fried rice, noodles — save for weekends.',
      items: [],
      kcal: 700, prepMinutes: 0,
      tags: ['cheat'],
      isCheat: true,
      howToPrepare: [
        'This is a cheat meal option. Go outside or order in!',
        'Keep portions moderate.'
      ],
      benefits: [],
      bestFor: 'Weekends only. Not at night on weekdays.',
    },
  ],
};
