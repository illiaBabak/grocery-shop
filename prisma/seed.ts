import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const foods = [
  {
    name: 'Almonds',
    imageUrl: 'food/almonds.png',
    priceBy1kg: 14.99,
    category: 'nuts',
    description:
      'Raw almonds with a mild nutty flavor, perfect for snacking, baking, and healthy breakfasts.',
  },
  {
    name: 'Apple',
    imageUrl: 'food/apple.png',
    priceBy1kg: 2.49,
    category: 'fruits',
    description: 'Fresh juicy apple with a crisp texture and naturally sweet taste.',
  },
  {
    name: 'Arugula',
    imageUrl: 'food/arugula.png',
    priceBy1kg: 6.99,
    category: 'greens',
    description: 'Fresh arugula leaves with a peppery taste, ideal for salads and sandwiches.',
  },
  {
    name: 'Avocado',
    imageUrl: 'food/avocado.png',
    priceBy1kg: 7.49,
    category: 'fruits',
    description: 'Creamy ripe avocado, great for toast, salads, and homemade guacamole.',
  },
  {
    name: 'Banana',
    imageUrl: 'food/banana.png',
    priceBy1kg: 2.29,
    category: 'fruits',
    description: 'Sweet ripe bananas rich in flavor and perfect for snacks or smoothies.',
  },
  {
    name: 'Basil',
    imageUrl: 'food/basil.png',
    priceBy1kg: 9.99,
    category: 'greens',
    description:
      'Fragrant fresh basil leaves, excellent for pasta, pizza, and Mediterranean dishes.',
  },
  {
    name: 'Berry Juice',
    imageUrl: 'food/berry-juice.png',
    priceBy1kg: 4.49,
    category: 'drinks',
    description: 'Refreshing mixed berry juice with a rich fruity taste and vibrant color.',
  },
  {
    name: 'Black Currant',
    imageUrl: 'food/black-currant.png',
    priceBy1kg: 7.99,
    category: 'berries',
    description:
      'Dark black currants with an intense tart-sweet flavor, great for desserts and jams.',
  },
  {
    name: 'Blackberry',
    imageUrl: 'food/blackberry.png',
    priceBy1kg: 8.49,
    category: 'berries',
    description: 'Fresh blackberries with a deep sweet taste and soft juicy texture.',
  },
  {
    name: 'Blueberry',
    imageUrl: 'food/blueberry.png',
    priceBy1kg: 8.99,
    category: 'berries',
    description: 'Sweet blueberries full of flavor, ideal for yogurt, oatmeal, and baking.',
  },
  {
    name: 'Broccoli',
    imageUrl: 'food/broccoli.png',
    priceBy1kg: 3.99,
    category: 'vegetables',
    description:
      'Fresh green broccoli packed with nutrients, perfect for steaming, roasting, or stir-fry.',
  },
  {
    name: 'Buckwheat',
    imageUrl: 'food/buckwheat.png',
    priceBy1kg: 3.49,
    category: 'pantry',
    description: 'Premium buckwheat groats, a hearty pantry staple for healthy everyday meals.',
  },
  {
    name: 'Carrot',
    imageUrl: 'food/carrot.png',
    priceBy1kg: 1.99,
    category: 'vegetables',
    description: 'Crunchy fresh carrots with a naturally sweet taste, perfect raw or cooked.',
  },
  {
    name: 'Cashews',
    imageUrl: 'food/cashews.png',
    priceBy1kg: 15.99,
    category: 'nuts',
    description: 'Creamy cashews with a smooth texture, ideal for snacks and cooking.',
  },
  {
    name: 'Cherry Juice',
    imageUrl: 'food/cherry-juice.png',
    priceBy1kg: 4.99,
    category: 'drinks',
    description: 'Rich cherry juice with a balanced sweet and tart flavor.',
  },
  {
    name: 'Cherry',
    imageUrl: 'food/cherry.png',
    priceBy1kg: 6.99,
    category: 'berries',
    description: 'Fresh sweet cherries with juicy flesh and deep red color.',
  },
  {
    name: 'Chili Flakes',
    imageUrl: 'food/chili-flakes.png',
    priceBy1kg: 10.99,
    category: 'spices',
    description: 'Hot chili flakes for adding heat and bold flavor to pizza, pasta, and sauces.',
  },
  {
    name: 'Cilantro',
    imageUrl: 'food/cilantro.png',
    priceBy1kg: 6.49,
    category: 'greens',
    description:
      'Fresh cilantro with a bright herbal flavor, perfect for soups, tacos, and salads.',
  },
  {
    name: 'Citrus Juice',
    imageUrl: 'food/citrus-juice.png',
    priceBy1kg: 4.29,
    category: 'drinks',
    description: 'Refreshing citrus juice blend with a lively sweet and tangy taste.',
  },
  {
    name: 'Corn',
    imageUrl: 'food/corn.png',
    priceBy1kg: 2.99,
    category: 'vegetables',
    description: 'Sweet corn with tender kernels, excellent for grilling, boiling, or salads.',
  },
  {
    name: 'Crackers',
    imageUrl: 'food/crackers.png',
    priceBy1kg: 5.49,
    category: 'pantry',
    description: 'Crispy butter crackers, perfect as a snack or with cheese and spreads.',
  },
  {
    name: 'Cucumber',
    imageUrl: 'food/cucumber.png',
    priceBy1kg: 2.49,
    category: 'vegetables',
    description: 'Cool and crisp cucumber, ideal for salads, sandwiches, and fresh snacks.',
  },
  {
    name: 'Dill',
    imageUrl: 'food/dill.png',
    priceBy1kg: 6.99,
    category: 'greens',
    description: 'Fresh dill with a delicate herbal aroma, great for potatoes, fish, and sauces.',
  },
  {
    name: 'Eggplant',
    imageUrl: 'food/eggplant.png',
    priceBy1kg: 3.49,
    category: 'vegetables',
    description: 'Fresh eggplant with tender flesh, perfect for roasting, grilling, and stews.',
  },
  {
    name: 'Gooseberry',
    imageUrl: 'food/gooseberry.png',
    priceBy1kg: 6.99,
    category: 'berries',
    description:
      'Tangy gooseberries with a bright fresh taste, excellent for compotes and desserts.',
  },
  {
    name: 'Grapes',
    imageUrl: 'food/grapes.png',
    priceBy1kg: 4.49,
    category: 'fruits',
    description: 'Sweet seedless grapes, perfect for snacking and fruit platters.',
  },
  {
    name: 'Green Juice',
    imageUrl: 'food/green-juice.png',
    priceBy1kg: 5.49,
    category: 'drinks',
    description: 'Fresh green juice blend with a clean, light, and refreshing taste.',
  },
  {
    name: 'Green Lentils',
    imageUrl: 'food/green-lentils.png',
    priceBy1kg: 3.99,
    category: 'pantry',
    description:
      'Nutritious green lentils, a versatile pantry ingredient for soups and side dishes.',
  },
  {
    name: 'Green Onion',
    imageUrl: 'food/green-onion.png',
    priceBy1kg: 4.49,
    category: 'greens',
    description: 'Fresh green onions with a mild onion flavor for salads, eggs, and hot dishes.',
  },
  {
    name: 'Ground Cumin',
    imageUrl: 'food/ground-cumin.png',
    priceBy1kg: 9.99,
    category: 'spices',
    description: 'Warm and earthy ground cumin for curries, rice dishes, and roasted vegetables.',
  },
  {
    name: 'Hazelnuts',
    imageUrl: 'food/hazelnuts.png',
    priceBy1kg: 13.99,
    category: 'nuts',
    description: 'Crunchy hazelnuts with a rich roasted flavor, perfect for snacks and baking.',
  },
  {
    name: 'Honey',
    imageUrl: 'food/honey.png',
    priceBy1kg: 7.99,
    category: 'pantry',
    description:
      'Natural golden honey with a smooth sweet taste, ideal for tea, toast, and desserts.',
  },
  {
    name: 'Italian Herbs',
    imageUrl: 'food/italian-herbs.png',
    priceBy1kg: 8.99,
    category: 'spices',
    description: 'Classic Italian herb blend for pasta sauces, pizza, and roasted vegetables.',
  },
  {
    name: 'Leaf Lettuce',
    imageUrl: 'food/leaf-lettuce.png',
    priceBy1kg: 2.99,
    category: 'greens',
    description: 'Tender green leaf lettuce, perfect for salads and fresh wraps.',
  },
  {
    name: 'Iceberg Lettuce',
    imageUrl: 'food/lettuce.png',
    priceBy1kg: 2.49,
    category: 'greens',
    description: 'Crisp iceberg lettuce with a refreshing bite, excellent for salads and burgers.',
  },
  {
    name: 'Macadamia',
    imageUrl: 'food/macadamia.png',
    priceBy1kg: 19.99,
    category: 'nuts',
    description: 'Premium macadamia nuts with a buttery texture and delicate taste.',
  },
  {
    name: 'Mango Juice',
    imageUrl: 'food/mango-juice.png',
    priceBy1kg: 4.99,
    category: 'drinks',
    description: 'Smooth mango juice with a tropical aroma and naturally sweet flavor.',
  },
  {
    name: 'Mango',
    imageUrl: 'food/mango.png',
    priceBy1kg: 4.99,
    category: 'fruits',
    description: 'Sweet tropical mango with juicy flesh and a rich fruity aroma.',
  },
  {
    name: 'Orange Juice',
    imageUrl: 'food/orange-juice.png',
    priceBy1kg: 4.49,
    category: 'drinks',
    description: 'Fresh orange juice with a bright citrus taste and natural sweetness.',
  },
  {
    name: 'Orange',
    imageUrl: 'food/orange.png',
    priceBy1kg: 2.49,
    category: 'fruits',
    description: 'Juicy orange full of citrus flavor, perfect for snacking or juicing.',
  },
  {
    name: 'Papaya',
    imageUrl: 'food/papaya.png',
    priceBy1kg: 4.49,
    category: 'fruits',
    description: 'Ripe papaya with soft tropical flesh and a mellow sweet flavor.',
  },
  {
    name: 'Paprika',
    imageUrl: 'food/paprika.png',
    priceBy1kg: 9.49,
    category: 'spices',
    description: 'Sweet paprika powder for soups, sauces, and roasted dishes.',
  },
  {
    name: 'Parsley',
    imageUrl: 'food/parsley.png',
    priceBy1kg: 6.49,
    category: 'greens',
    description: 'Fresh parsley with a clean herbal flavor, great for garnishing and cooking.',
  },
  {
    name: 'Pasta',
    imageUrl: 'food/pasta.png',
    priceBy1kg: 3.99,
    category: 'pantry',
    description: 'Classic dry pasta for quick and satisfying everyday meals.',
  },
  {
    name: 'Peach Juice',
    imageUrl: 'food/peach-juice.png',
    priceBy1kg: 4.49,
    category: 'drinks',
    description: 'Smooth peach juice with a delicate sweet fruit flavor.',
  },
  {
    name: 'Peanuts',
    imageUrl: 'food/peanuts.png',
    priceBy1kg: 4.99,
    category: 'nuts',
    description: 'Crunchy peanuts, ideal for snacking, sauces, and homemade mixes.',
  },
  {
    name: 'Pecans',
    imageUrl: 'food/pecans.png',
    priceBy1kg: 16.99,
    category: 'nuts',
    description: 'Rich pecans with a buttery taste, perfect for baking and premium snacks.',
  },
  {
    name: 'Pepper Mix',
    imageUrl: 'food/pepper-mix.png',
    priceBy1kg: 8.99,
    category: 'spices',
    description: 'Mixed pepper blend with balanced heat and aroma for everyday seasoning.',
  },
  {
    name: 'Bell Pepper',
    imageUrl: 'food/pepper.png',
    priceBy1kg: 3.49,
    category: 'vegetables',
    description: 'Fresh bell pepper with a sweet crisp texture, perfect raw or cooked.',
  },
  {
    name: 'Peppercorns',
    imageUrl: 'food/peppercorns.png',
    priceBy1kg: 10.49,
    category: 'spices',
    description: 'Whole peppercorns with a bold aroma, ideal for grinders and marinades.',
  },
  {
    name: 'Pineapple',
    imageUrl: 'food/pineapple.png',
    priceBy1kg: 4.29,
    category: 'fruits',
    description: 'Sweet and juicy pineapple with a tropical flavor and refreshing acidity.',
  },
  {
    name: 'Pistachios',
    imageUrl: 'food/pistachios.png',
    priceBy1kg: 17.99,
    category: 'nuts',
    description: 'Premium pistachios with a savory nutty flavor and crunchy texture.',
  },
  {
    name: 'Raspberry',
    imageUrl: 'food/raspberry.png',
    priceBy1kg: 9.49,
    category: 'berries',
    description: 'Fresh raspberries with a bright sweet-tart taste and soft texture.',
  },
  {
    name: 'Red Currant',
    imageUrl: 'food/red-currant.png',
    priceBy1kg: 7.99,
    category: 'berries',
    description: 'Bright red currants with a tart fruity flavor, perfect for jams and desserts.',
  },
  {
    name: 'Rolled Oats',
    imageUrl: 'food/rolled-oats.png',
    priceBy1kg: 3.49,
    category: 'pantry',
    description: 'Rolled oats for porridge, granola, and wholesome breakfasts.',
  },
  {
    name: 'Sea Salt',
    imageUrl: 'food/sea-salt.png',
    priceBy1kg: 2.29,
    category: 'spices',
    description: 'Pure sea salt crystals for everyday cooking and seasoning.',
  },
  {
    name: 'Spinach',
    imageUrl: 'food/spinach.png',
    priceBy1kg: 3.99,
    category: 'greens',
    description: 'Fresh spinach leaves, ideal for salads, smoothies, and warm dishes.',
  },
  {
    name: 'Strawberry Juice',
    imageUrl: 'food/strawberry-juice.png',
    priceBy1kg: 4.49,
    category: 'drinks',
    description: 'Sweet strawberry juice with a refreshing berry flavor.',
  },
  {
    name: 'Strawberry',
    imageUrl: 'food/strawberry.png',
    priceBy1kg: 8.49,
    category: 'berries',
    description: 'Fresh strawberries with a sweet aroma and juicy texture.',
  },
  {
    name: 'Sugar',
    imageUrl: 'food/sugar.png',
    priceBy1kg: 1.99,
    category: 'pantry',
    description: 'Fine white sugar for baking, desserts, and sweetening beverages.',
  },
  {
    name: 'Tomato',
    imageUrl: 'food/tomato.png',
    priceBy1kg: 2.99,
    category: 'vegetables',
    description: 'Juicy ripe tomato with a balanced sweet and tangy flavor.',
  },
  {
    name: 'Turmeric',
    imageUrl: 'food/turmeric.png',
    priceBy1kg: 9.99,
    category: 'spices',
    description: 'Ground turmeric with a warm earthy flavor and vivid golden color.',
  },
  {
    name: 'Walnuts',
    imageUrl: 'food/walnuts.png',
    priceBy1kg: 12.99,
    category: 'nuts',
    description: 'Nutty walnuts with a rich flavor, great for baking, salads, and snacks.',
  },
  {
    name: 'White Rice',
    imageUrl: 'food/white-rice.png',
    priceBy1kg: 2.99,
    category: 'pantry',
    description: 'Premium white rice, a versatile staple for everyday cooking.',
  },
] as const;

const users = [
  {
    name: 'Emily Carter',
    email: 'emily.carter@example.com',
    passwordHash: '$2b$12$seedUserHash000000000000000000000000000000000000001',
  },
  {
    name: 'Daniel Brooks',
    email: 'daniel.brooks@example.com',
    passwordHash: '$2b$12$seedUserHash000000000000000000000000000000000000002',
  },
  {
    name: 'Sophia Turner',
    email: 'sophia.turner@example.com',
    passwordHash: '$2b$12$seedUserHash000000000000000000000000000000000000003',
  },
  {
    name: 'Michael Reed',
    email: 'michael.reed@example.com',
    passwordHash: '$2b$12$seedUserHash000000000000000000000000000000000000004',
  },
  {
    name: 'Olivia Bennett',
    email: 'olivia.bennett@example.com',
    passwordHash: '$2b$12$seedUserHash000000000000000000000000000000000000005',
  },
  {
    name: 'James Cooper',
    email: 'james.cooper@example.com',
    passwordHash: '$2b$12$seedUserHash000000000000000000000000000000000000006',
  },
  {
    name: 'Charlotte Hayes',
    email: 'charlotte.hayes@example.com',
    passwordHash: '$2b$12$seedUserHash000000000000000000000000000000000000007',
  },
  {
    name: 'Benjamin Scott',
    email: 'benjamin.scott@example.com',
    passwordHash: '$2b$12$seedUserHash000000000000000000000000000000000000008',
  },
  {
    name: 'Amelia Ward',
    email: 'amelia.ward@example.com',
    passwordHash: '$2b$12$seedUserHash000000000000000000000000000000000000009',
  },
  {
    name: 'Lucas Foster',
    email: 'lucas.foster@example.com',
    passwordHash: '$2b$12$seedUserHash000000000000000000000000000000000000010',
  },
] as const;

const reviewSeeds = [
  {
    foodName: 'Apple',
    userEmail: 'emily.carter@example.com',
    stars: 5,
    content: 'Very crisp and sweet. Great for quick snacks during the day.',
  },
  {
    foodName: 'Banana',
    userEmail: 'daniel.brooks@example.com',
    stars: 5,
    content: 'Fresh and ripe, exactly what I expected.',
  },
  {
    foodName: 'Avocado',
    userEmail: 'sophia.turner@example.com',
    stars: 5,
    content: 'Nice avocado, creamy inside and perfect for toast.',
  },
  {
    foodName: 'Grapes',
    userEmail: 'michael.reed@example.com',
    stars: 4,
    content: 'Sweet and juicy, worked really well in fruit salad.',
  },
  {
    foodName: 'Pineapple',
    userEmail: 'olivia.bennett@example.com',
    stars: 5,
    content: 'Good pineapple with fresh taste, would buy again.',
  },
  {
    foodName: 'Mango',
    userEmail: 'james.cooper@example.com',
    stars: 5,
    content: 'The mango was aromatic and soft, very good quality.',
  },
  {
    foodName: 'Orange',
    userEmail: 'charlotte.hayes@example.com',
    stars: 4,
    content: 'Fresh orange, lots of juice and nice flavor.',
  },
  {
    foodName: 'Strawberry',
    userEmail: 'benjamin.scott@example.com',
    stars: 5,
    content: 'Excellent strawberries, sweet and fragrant.',
  },
  {
    foodName: 'Blueberry',
    userEmail: 'amelia.ward@example.com',
    stars: 5,
    content: 'Blueberries were fresh and firm, perfect for oatmeal.',
  },
  {
    foodName: 'Raspberry',
    userEmail: 'lucas.foster@example.com',
    stars: 4,
    content: 'Nice raspberries, slightly delicate but very tasty.',
  },
  {
    foodName: 'Broccoli',
    userEmail: 'emily.carter@example.com',
    stars: 5,
    content: 'Broccoli looked fresh and cooked well.',
  },
  {
    foodName: 'Cucumber',
    userEmail: 'daniel.brooks@example.com',
    stars: 5,
    content: 'Crunchy cucumber, very fresh.',
  },
  {
    foodName: 'Tomato',
    userEmail: 'sophia.turner@example.com',
    stars: 4,
    content: 'Tomatoes were ripe and flavorful, good for salads.',
  },
  {
    foodName: 'Corn',
    userEmail: 'michael.reed@example.com',
    stars: 5,
    content: 'Sweet corn, tender kernels and good quality.',
  },
  {
    foodName: 'Bell Pepper',
    userEmail: 'olivia.bennett@example.com',
    stars: 4,
    content: 'Fresh bell pepper, crisp and colorful.',
  },
  {
    foodName: 'Spinach',
    userEmail: 'james.cooper@example.com',
    stars: 5,
    content: 'Spinach leaves were fresh and clean.',
  },
  {
    foodName: 'Basil',
    userEmail: 'charlotte.hayes@example.com',
    stars: 5,
    content: 'Basil had a strong aroma, perfect for homemade pasta.',
  },
  {
    foodName: 'Parsley',
    userEmail: 'benjamin.scott@example.com',
    stars: 4,
    content: 'Parsley stayed fresh for several days in the fridge.',
  },
  {
    foodName: 'Walnuts',
    userEmail: 'amelia.ward@example.com',
    stars: 5,
    content: 'Really good walnuts, rich taste and crunchy texture.',
  },
  {
    foodName: 'Pistachios',
    userEmail: 'lucas.foster@example.com',
    stars: 5,
    content: 'Pistachios were fresh and flavorful, premium quality.',
  },
  {
    foodName: 'Cashews',
    userEmail: 'emily.carter@example.com',
    stars: 5,
    content: 'Cashews were smooth and tasty, perfect for snacking.',
  },
  {
    foodName: 'Almonds',
    userEmail: 'daniel.brooks@example.com',
    stars: 4,
    content: 'Good clean nuts, crunchy and fresh.',
  },
  {
    foodName: 'White Rice',
    userEmail: 'sophia.turner@example.com',
    stars: 5,
    content: 'Very good white rice, cooks evenly and tastes great.',
  },
  {
    foodName: 'Rolled Oats',
    userEmail: 'michael.reed@example.com',
    stars: 5,
    content: 'Rolled oats were fresh and perfect for breakfast bowls.',
  },
  {
    foodName: 'Buckwheat',
    userEmail: 'olivia.bennett@example.com',
    stars: 4,
    content: 'Good pantry staple, the buckwheat quality is solid.',
  },
  {
    foodName: 'Pasta',
    userEmail: 'james.cooper@example.com',
    stars: 5,
    content: 'Pasta quality is nice, holds shape after cooking.',
  },
  {
    foodName: 'Honey',
    userEmail: 'charlotte.hayes@example.com',
    stars: 5,
    content: 'Honey tastes natural and not overly processed.',
  },
  {
    foodName: 'Orange Juice',
    userEmail: 'benjamin.scott@example.com',
    stars: 5,
    content: 'Orange juice was refreshing and not too sweet.',
  },
  {
    foodName: 'Mango Juice',
    userEmail: 'amelia.ward@example.com',
    stars: 4,
    content: 'Mango juice had a nice tropical taste.',
  },
  {
    foodName: 'Berry Juice',
    userEmail: 'lucas.foster@example.com',
    stars: 5,
    content: 'Berry juice is flavorful and vibrant, really enjoyed it.',
  },
  {
    foodName: 'Paprika',
    userEmail: 'emily.carter@example.com',
    stars: 5,
    content: 'Paprika is aromatic and works well in soups.',
  },
  {
    foodName: 'Turmeric',
    userEmail: 'daniel.brooks@example.com',
    stars: 4,
    content: 'Turmeric has a strong color and nice earthy taste.',
  },
  {
    foodName: 'Sea Salt',
    userEmail: 'sophia.turner@example.com',
    stars: 5,
    content: 'Simple product but very good quality.',
  },
  {
    foodName: 'Ground Cumin',
    userEmail: 'michael.reed@example.com',
    stars: 5,
    content: 'Ground cumin smells fresh and adds a lot of flavor.',
  },
] as const;

async function main() {
  console.log('🌱 Starting seed...');

  await prisma.review.deleteMany();
  await prisma.food.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Old data removed');

  await prisma.food.createMany({
    data: foods.map((food) => ({
      name: food.name,
      imageUrl: food.imageUrl,
      priceBy1kg: food.priceBy1kg,
      category: food.category,
      description: food.description,
    })),
  });

  console.log(`🍎 Inserted ${foods.length} foods`);

  await prisma.user.createMany({
    data: users.map((user) => ({
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
    })),
  });

  console.log(`👤 Inserted ${users.length} users`);

  const dbFoods = await prisma.food.findMany({
    select: { id: true, name: true },
  });

  const dbUsers = await prisma.user.findMany({
    select: { id: true, email: true },
  });

  const foodIdByName = new Map(dbFoods.map((food) => [food.name, food.id]));
  const userIdByEmail = new Map(dbUsers.map((user) => [user.email, user.id]));

  const reviewsToCreate = reviewSeeds.map((review) => {
    const foodId = foodIdByName.get(review.foodName);
    const userId = userIdByEmail.get(review.userEmail);

    if (!foodId) {
      throw new Error(`Food not found for review: ${review.foodName}`);
    }

    if (!userId) {
      throw new Error(`User not found for review: ${review.userEmail}`);
    }

    return {
      content: review.content,
      stars: review.stars,
      foodId,
      userId,
    };
  });

  await prisma.review.createMany({
    data: reviewsToCreate,
  });

  console.log(`⭐ Inserted ${reviewsToCreate.length} reviews`);
  console.log('✅ Seed finished successfully');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed');
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
