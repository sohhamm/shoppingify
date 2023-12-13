import {db} from '.'
import {category, item, itemCategory} from './schema'
import {v4 as uuidv4} from 'uuid'

const categories: Category[] = [
  {
    category_name: 'Diary & Eggs',
    category_desc: 'Includes essential dairy products like milk, cheese, butter, yogurt, and eggs.',
  },
  {
    category_name: 'Fruits & Vegetables',
    category_desc:
      'A variety of fresh fruits and vegetables, from apples and bananas to carrots and lettuce.',
  },
  {
    category_name: 'Meat & Seafood',
    category_desc:
      'Offers a range of meat and seafood options such as chicken, beef, salmon, and shrimp.',
  },
  {
    category_name: 'Bakery & Bread',
    category_desc:
      'Features baked goods like sliced bread, bagels, croissants, and hamburger buns.',
  },
  {
    category_name: 'Pantry Staples',
    category_desc: 'Essential pantry items including flour, sugar, rice, pasta, and canned beans.',
  },
  {
    category_name: 'Beverages',
    category_desc: 'Covers a range of drinks from bottled water and juice to coffee and tea.',
  },
  {
    category_name: 'Frozen Foods',
    category_desc: 'Frozen items such as vegetables, ice cream, pizza, and ready-to-eat meals.',
  },
  {
    category_name: 'Snacks & Sweets',
    category_desc: 'Snacks and confectioneries like chips, chocolate, popcorn, nuts, and cookies.',
  },
  {
    category_name: 'Cleaning Supplies',
    category_desc:
      'Cleaning essentials including dish soap, all-purpose cleaners, laundry detergent, and paper towels.',
  },
  {
    category_name: 'Personal Care',
    category_desc:
      'Personal hygiene products like shampoo, toothpaste, soap, toilet paper, and razors.',
  },
  {
    category_name: 'Baby & Kids',
    category_desc:
      "Baby and children's products such as diapers, wipes, baby food, and kid-friendly snacks.",
  },
  {
    category_name: 'Health & Wellness',
    category_desc:
      'Healthcare items including multivitamins, pain relievers, band-aids, hand sanitizer, and cold medicine.',
  },
  {
    category_name: 'Pet Supplies',
    category_desc:
      'Pet care products like food, treats, litter, shampoo, and toys for dogs and cats.',
  },
]

const getItemsForCategories = name => {
  switch (name) {
    case 'Dairy & Eggs':
      return [
        {name: 'Milk', note: 'A variety of milk types including whole, skimmed, and plant-based.'},
        {name: 'Cheese', note: 'Includes a range of cheese from cheddar to gouda.'},
        {name: 'Butter', note: 'Salted and unsalted options available.'},
        {name: 'Yogurt', note: 'Plain and flavored options, including Greek yogurt.'},
        {name: 'Eggs', note: 'Free-range, organic, and cage-free eggs.'},
      ]
    case 'Fruits & Vegetables':
      return [
        {name: 'Apples', note: 'Includes varieties like Fuji, Gala, and Granny Smith.'},
        {name: 'Bananas', note: 'Fresh and ripe, ready for consumption.'},
        {name: 'Carrots', note: 'Crunchy and nutritious, perfect for snacks or cooking.'},
        {name: 'Tomatoes', note: 'Ripe, juicy tomatoes suitable for salads and sauces.'},
        {name: 'Lettuce', note: 'Fresh greens ideal for salads and sandwiches.'},
      ]
    case 'Meat & Seafood':
      return [
        {name: 'Chicken Breasts', note: 'Versatile and lean, suitable for grilling and baking.'},
        {
          name: 'Ground Beef',
          note: 'Perfect for burgers and meatballs, available in various fat contents.',
        },
        {name: 'Salmon Fillets', note: 'Rich in Omega-3, ideal for grilling or baking.'},
        {name: 'Pork Chops', note: 'Tender and flavorful, suitable for various cooking methods.'},
        {name: 'Shrimp', note: 'Fresh or frozen, ideal for quick meals.'},
      ]
    case 'Bakery & Bread':
      return [
        {name: 'Sliced Bread', note: 'Soft and fresh, ideal for sandwiches and toast.'},
        {name: 'Bagels', note: 'Chewy and delicious, perfect for breakfast or snacks.'},
        {name: 'Croissants', note: 'Buttery and flaky, a delightful pastry treat.'},
        {name: 'Hamburger Buns', note: 'Soft buns perfect for burgers and sandwiches.'},
        {name: 'Whole Wheat Bread', note: 'A healthier option with a rich, nutty flavor.'},
      ]
    case 'Pantry Staples':
      return [
        {name: 'Flour', note: 'All-purpose, whole wheat, and specialty flours available.'},
        {name: 'Sugar', note: 'Includes granulated, powdered, and brown sugars.'},
        {name: 'Rice', note: 'Varieties include white, brown, basmati, and jasmine.'},
        {name: 'Pasta', note: 'A range of types like spaghetti, penne, and fusilli.'},
        {
          name: 'Canned Beans',
          note: 'Convenient and nutritious, includes black, pinto, and kidney beans.',
        },
      ]
    case 'Beverages':
      return [
        {name: 'Bottled Water', note: 'Still and sparkling options for hydration.'},
        {name: 'Orange Juice', note: 'Freshly squeezed and from concentrate varieties.'},
        {name: 'Coffee', note: 'Whole beans, ground, and instant coffee options.'},
        {name: 'Tea Bags', note: 'Includes black, green, herbal, and specialty teas.'},
        {name: 'Soda', note: 'Various flavors and brands, including diet options.'},
      ]
    case 'Frozen Foods':
      return [
        {name: 'Frozen Vegetables', note: 'A convenient way to keep vegetables on hand.'},
        {name: 'Ice Cream', note: 'A variety of flavors and brands to satisfy sweet cravings.'},
        {name: 'Frozen Pizza', note: 'Quick and easy meal options in various flavors.'},
        {name: 'Frozen Chicken Nuggets', note: 'A kid-friendly favorite, easy to prepare.'},
        {name: 'Frozen Meals', note: 'Convenient for quick lunches and dinners.'},
      ]
    case 'Snacks & Sweets':
      return [
        {name: 'Potato Chips', note: 'Crispy and savory, available in various flavors.'},
        {name: 'Chocolate Bars', note: 'From milk to dark chocolate, a sweet treat.'},
        {name: 'Popcorn', note: 'Perfect for snacking, available in buttered and light versions.'},
        {name: 'Nuts', note: 'A healthy snack option, includes almonds, cashews, and peanuts.'},
        {name: 'Cookies', note: 'A variety of flavors and brands for a sweet snack.'},
      ]
    case 'Cleaning Supplies':
      return [
        {name: 'Dish Soap', note: 'Effective for cleaning and cutting through grease.'},
        {
          name: 'All-Purpose Cleaner',
          note: 'Ideal for multiple surfaces, leaving them clean and fresh.',
        },
        {name: 'Laundry Detergent', note: 'Liquid and powder options for all types of washers.'},
        {name: 'Paper Towels', note: 'Absorbent and strong for cleaning up spills.'},
        {name: 'Trash Bags', note: 'Durable bags in various sizes for waste management.'},
      ]
    case 'Personal Care':
      return [
        {
          name: 'Shampoo & Conditioner',
          note: 'Suitable for all hair types, includes natural options.',
        },
        {name: 'Toothpaste', note: 'Fluoride and fluoride-free options available.'},
        {name: 'Baby Soap', note: 'Gentle and hypoallergenic for sensitive skin.'},
        {
          name: 'Toilet Paper',
          note: 'Soft and strong, available in different ply options.',
        },
        {
          name: 'Razors',
          note: 'High-quality razors for smooth shaving, includes disposable options.',
        },
      ]
    case 'Baby & Kids':
      return [
        {name: 'Diapers', note: 'Various sizes available for newborns to toddlers.'},
        {
          name: 'Baby Wipes',
          note: 'Gentle wipes for sensitive skin, fragrance-free options available.',
        },
        {
          name: 'Baby Food',
          note: 'Nutritious options for different stages of baby development.',
        },
        {
          name: "Children's Snacks",
          note: 'Healthy snack options for kids, includes organic choices.',
        },
        {
          name: "Kid's Toothpaste",
          note: 'Safe for kids, comes in fun flavors to encourage brushing.',
        },
      ]
    case 'Health & Wellness':
      return [
        {name: 'Multivitamins', note: 'Includes options for all ages and specific health needs.'},
        {name: 'Pain Relievers', note: 'Effective relief for headaches, muscle pain, and more.'},
        {name: 'Band Aids', note: 'Various sizes and types for different injuries.'},
        {name: 'Hand Sanitizer', note: 'Kills germs, available in scented and unscented formulas.'},
        {
          name: 'Cold Medicine',
          note: 'Relief for cold and flu symptoms, includes non-drowsy formulas.',
        },
      ]
    case 'Pet Supplies':
      return [
        {name: 'Dog/Cat Food', note: 'Nutritious meals for pets, includes specialized diets.'},
        {name: 'Pet Treats', note: 'Delicious treats for training and rewards.'},
        {name: 'Cat Litter', note: 'High-quality litter for odor control and easy cleanup.'},
        {name: 'Pet Shampoo', note: 'Gentle formulas for pet skin and coat care.'},
        {name: 'Pet Toys', note: 'Fun and engaging toys for pets’ playtime and exercise.'},
      ]

    default:
      return [] // Default case if category not found
  }
}

async function seed() {
  try {
    console.log('seed started: ', performance.now())

    for (const cat of categories) {
      try {
        const cat_id = uuidv4()
        const items = getItemsForCategories(cat.category_name)
        await db
          .insert(category)
          .values({...cat, category_id: cat_id})
          .returning()

        for (const i of items) {
          const i_id = uuidv4()
          await db
            .insert(item)
            .values({...i, item_id: i_id})
            .returning()

          await db.insert(itemCategory).values({category_id: cat_id, item_id: i_id}).returning()
        }
      } catch (error) {
        console.error('An error occurred while seeding:', error)
      }
    }

    console.log(
      'Successfully seeded category and item table with default values, :',
      performance.now(),
    )
    process.exit(0)
  } catch (error) {
    console.error('Error seeding data: ', error)
    process.exit(1)
  }
}

seed()

type Category = typeof category.$inferInsert
