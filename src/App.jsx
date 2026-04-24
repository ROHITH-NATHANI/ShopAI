import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";

// ── DATA ────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Wireless Pro Headphones", price: 11999, category: "Electronics", rating: 4.8, reviews: 2341, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500", badge: "Best Seller", desc: "Premium sound with ANC & 40hr battery.", stock: 12 },
  { id: 2, name: "Minimalist Leather Watch", price: 18499, category: "Fashion", rating: 4.6, reviews: 876, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500", badge: "New", desc: "Italian leather strap, sapphire crystal glass.", stock: 5 },
  { id: 3, name: "Organic Green Tea Set", price: 2799, category: "Food", rating: 4.9, reviews: 3120, img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=500", badge: "Top Rated", desc: "Premium matcha blend from Uji, Japan.", stock: 50 },
  { id: 4, name: "Mechanical Keyboard", price: 15199, category: "Electronics", rating: 4.7, reviews: 1542, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=500", badge: "Hot", desc: "Cherry MX switches, RGB backlit, TKL layout.", stock: 8 },
  { id: 5, name: "Yoga Mat Premium", price: 4799, category: "Sports", rating: 4.5, reviews: 654, img: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=500", badge: "", desc: "Non-slip, eco-friendly, 6mm cushioning.", stock: 30 },
  { id: 6, name: "Smart Fitness Band", price: 6399, category: "Electronics", rating: 4.4, reviews: 2100, img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=500", badge: "", desc: "Heart rate, SpO2, sleep tracking, 7-day battery.", stock: 18 },
  { id: 7, name: "Ceramic Planter Set", price: 3999, category: "Home", rating: 4.7, reviews: 432, img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=500", badge: "New", desc: "Set of 3 handcrafted ceramic pots with trays.", stock: 14 },
  { id: 8, name: "Sunglasses Aviator", price: 9599, category: "Fashion", rating: 4.5, reviews: 788, img: "https://images.unsplash.com/photo-1511499767350-a1590fdb7307?q=80&w=500", badge: "", desc: "Polarized UV400 lenses, stainless steel frame.", stock: 20 },
  { id: 9, name: "Portable Blender", price: 3199, category: "Home", rating: 4.6, reviews: 1234, img: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=500", badge: "Best Seller", desc: "USB-C rechargeable, 6-blade, 350ml capacity.", stock: 35 },
  { id: 10, name: "Running Shoes X1", price: 10799, category: "Sports", rating: 4.8, reviews: 3456, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500", badge: "Top Rated", desc: "Lightweight foam sole, breathable mesh upper.", stock: 9 },
  { id: 11, name: "Scented Candle Set", price: 2399, category: "Home", rating: 4.9, reviews: 2200, img: "https://images.unsplash.com/photo-1603006905003-be475563bc7f?q=80&w=500", badge: "Trending", desc: "Set of 4 soy wax candles, 40hr burn each.", stock: 60 },
  { id: 12, name: "4K AI Projector", price: 71999, category: "Electronics", rating: 4.9, reviews: 120, img: "https://images.unsplash.com/photo-1517603957032-1ac53bc162eb?q=80&w=500", badge: "Premium", desc: "Native 4K, AI image scaling, 3000 lumens.", stock: 5 },
  { id: 13, name: "Designer Silk Scarf", price: 7199, category: "Fashion", rating: 4.7, reviews: 310, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500", badge: "", desc: "100% mulberry silk, hand-rolled edges.", stock: 15 },
  { id: 14, name: "Artisanal Coffee Beans", price: 1999, category: "Food", rating: 4.8, reviews: 1500, img: "https://images.unsplash.com/photo-1559056191-7440026e6415?q=80&w=500", badge: "Aromatic", desc: "Single-origin, medium roast from Ethiopia.", stock: 40 },
  { id: 15, name: "Smart Kettle Pro", price: 5599, category: "Home", rating: 4.6, reviews: 450, img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500", badge: "Smart", desc: "Wi-Fi control, precise temp, voice sync.", stock: 25 },
  { id: 16, name: "Adjustable Dumbbells", price: 23999, category: "Sports", rating: 4.7, reviews: 890, img: "https://images.unsplash.com/photo-1586401100318-7ed09772c676?q=80&w=500", badge: "Space Saver", desc: "Replaces 15 sets of weights, 5-52.5 lbs.", stock: 10 },
  { id: 17, name: "Noise Cancelling Buds", price: 10399, category: "Electronics", rating: 4.5, reviews: 1100, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=500", badge: "", desc: "True wireless, ambient mode, IPX5 waterproof.", stock: 30 },
  { id: 18, name: "Merino Wool Sweater", price: 11999, category: "Fashion", rating: 4.8, reviews: 670, img: "https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?q=80&w=500", badge: "Luxury", desc: "Ultra-soft, temperature regulating merino.", stock: 12 },
  { id: 19, name: "Truffle Oil Infused Kit", price: 4399, category: "Food", rating: 4.9, reviews: 230, img: "https://images.unsplash.com/photo-1508737804141-4c3b688e2546?q=80&w=500", badge: "Gourmet", desc: "Black & white truffle oils with sea salt.", stock: 20 },
  { id: 20, name: "Air Purifier Elite", price: 15999, category: "Home", rating: 4.7, reviews: 1420, img: "https://images.unsplash.com/photo-1585771724684-252a10684f85?q=80&w=500", badge: "Health", desc: "HEPA 13 filter, quiet mode, PM2.5 sensor.", stock: 18 },
  { id: 21, name: "Dual Monitor Stand", price: 6399, category: "Electronics", rating: 4.6, reviews: 540, img: "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=500", badge: "Workplace", desc: "Gas spring arms, VESA mount, cable mgmt.", stock: 22 },
  { id: 22, name: "Cashmere Beanie", price: 3599, category: "Fashion", rating: 4.5, reviews: 880, img: "https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?q=80&w=500", badge: "", desc: "100% Inner Mongolian cashmere, ribbed design.", stock: 45 },
  { id: 23, name: "Dark Chocolate Truffles", price: 1599, category: "Food", rating: 4.9, reviews: 3200, img: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=500", badge: "Classic", desc: "72% cocoa, velvet ganache, dusted with cocoa.", stock: 100 },
  { id: 24, name: "Table Lamp Modern", price: 7199, category: "Home", rating: 4.7, reviews: 432, img: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=500", badge: "Design", desc: "Brushed brass finish, touch control, warm LED.", stock: 14 },
  { id: 25, name: "Foam Roller Pro", price: 2799, category: "Sports", rating: 4.4, reviews: 654, img: "https://images.unsplash.com/photo-1626084300762-53946c6c13ed?q=80&w=500", badge: "", desc: "High density foam, grid texture for recovery.", stock: 35 },
  { id: 26, name: "Ergonomic Office Chair", price: 27999, category: "Home", rating: 4.8, reviews: 1200, img: "https://images.unsplash.com/photo-1505797149-43b00fe3ee2c?q=80&w=500", badge: "Premium", desc: "Lumbar support, breathable mesh, 4D armrests.", stock: 8 },
  { id: 27, name: "Leather Laptop Bag", price: 12799, category: "Fashion", rating: 4.6, reviews: 540, img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=500", badge: "Crafted", desc: "Full-grain leather, 15.6 inch laptop sleeve.", stock: 12 },
  { id: 28, name: "VR Headset X2", price: 39999, category: "Electronics", rating: 4.7, reviews: 310, img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=500", badge: "Future", desc: "All-in-one VR, spatial audio, 128GB storage.", stock: 10 },
  { id: 29, name: "Resistance Bands Set", price: 1599, category: "Sports", rating: 4.5, reviews: 2200, img: "https://images.unsplash.com/photo-1598289431512-b97b0917a63e?q=80&w=500", badge: "", desc: "Set of 5 levels, natural latex, carry bag.", stock: 150 },
  { id: 30, name: "Cold Pressed Olive Oil", price: 2399, category: "Food", rating: 4.9, reviews: 880, img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500", badge: "Organic", desc: "Extra virgin, early harvest, peppery finish.", stock: 60 },
  { id: 31, name: "Smart Bulb Kit (4)", price: 3999, category: "Home", rating: 4.6, reviews: 1540, img: "https://images.unsplash.com/photo-1550524513-3170cc681f3d?q=80&w=500", badge: "Smart", desc: "16 million colors, voice control, schedules.", stock: 40 },
  { id: 32, name: "Gimbal Stabilizer", price: 10399, category: "Electronics", rating: 4.5, reviews: 670, img: "https://images.unsplash.com/photo-1524333865940-2780e9227181?q=80&w=500", badge: "Video", desc: "3-axis stabilization, foldable, active tracking.", stock: 25 },
  { id: 33, name: "Cotton Bedding Set", price: 7199, category: "Home", rating: 4.7, reviews: 1100, img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500", badge: "Comfort", desc: "600 thread count, sateen weave, long-staple cotton.", stock: 20 },
  { id: 34, name: "Mountain Bike Helmet", price: 4799, category: "Sports", rating: 4.6, reviews: 430, img: "https://images.unsplash.com/photo-1557124816-e9b7d5440de2?q=80&w=500", badge: "Safety", desc: "MIPS technology, lightweight, 21 vents.", stock: 30 },
  { id: 35, name: "Espresso Machine", price: 47999, category: "Home", rating: 4.8, reviews: 210, img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=500", badge: "Pro", desc: "PID temp control, commercial steam wand.", stock: 6 },
  { id: 36, name: "Polarized Fishing Glasses", price: 3999, category: "Sports", rating: 4.5, reviews: 890, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500", badge: "", desc: "Saltwater safe, UV400, amber lens.", stock: 22 },
  { id: 37, name: "Smart Scale WiFi", price: 3199, category: "Electronics", rating: 4.4, reviews: 1420, img: "https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?q=80&w=500", badge: "", desc: "13 body metrics, syncs with health apps.", stock: 50 },
  { id: 38, name: "Wool Blend Coat", price: 15999, category: "Fashion", rating: 4.7, reviews: 540, img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=500", badge: "Winter", desc: "Heavyweight wool, tailored fit, satin lining.", stock: 15 },
  { id: 39, name: "Manuka Honey MGO 400", price: 5199, category: "Food", rating: 4.9, reviews: 670, img: "https://images.unsplash.com/photo-1558611997-d86e0018f6d2?q=80&w=500", badge: "Pure", desc: "Authentic New Zealand honey, high potency.", stock: 25 },
  { id: 40, name: "Cast Iron Skillet", price: 3599, category: "Home", rating: 4.8, reviews: 3100, img: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=500", badge: "Durable", desc: "Pre-seasoned, perfect heat retention.", stock: 40 },
  { id: 41, name: "Desktop Microphone", price: 7999, category: "Electronics", rating: 4.6, reviews: 880, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=500", badge: "Studio", desc: "USB condenser, quad polar patterns.", stock: 18 },
  { id: 42, name: "Yoga Bolster", price: 3199, category: "Sports", rating: 4.7, reviews: 310, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500", badge: "", desc: "Organic cotton cover, buckwheat hull filling.", stock: 20 },
  { id: 43, name: "Leather Chelsea Boots", price: 13599, category: "Fashion", rating: 4.6, reviews: 654, img: "https://images.unsplash.com/photo-1542288960-f6ad327d3745?q=80&w=500", badge: "", desc: "Full-grain leather, Goodyear welted.", stock: 12 },
  { id: 44, name: "Organic Almond Butter", price: 1199, category: "Food", rating: 4.8, reviews: 1540, img: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=500", badge: "Vegan", desc: "Dry roasted, no added sugar or oil.", stock: 80 },
  { id: 45, name: "Robotic Vacuum Pro", price: 31999, category: "Home", rating: 4.6, reviews: 890, img: "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=500", badge: "AI", desc: "Lidar mapping, self-emptying base.", stock: 5 },
  { id: 46, name: "Graphing Calculator", price: 9599, category: "Electronics", rating: 4.5, reviews: 432, img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=500", badge: "", desc: "Color screen, CAS functionality, rechargeable.", stock: 30 },
  { id: 47, name: "Swimming Goggles Pro", price: 2399, category: "Sports", rating: 4.5, reviews: 670, img: "https://images.unsplash.com/photo-1559136555-930d7bc9e322?q=80&w=500", badge: "", desc: "Anti-fog, mirrored lens, wide view.", stock: 50 },
  { id: 48, name: "Cashmere Scarf", price: 6399, category: "Fashion", rating: 4.8, reviews: 310, img: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=500", badge: "Elegant", desc: "2-ply cashmere, ultra warm and soft.", stock: 20 },
  { id: 49, name: "Matcha Whisk Set", price: 1999, category: "Food", rating: 4.9, reviews: 1200, img: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?q=80&w=500", badge: "Zen", desc: "Bamboo whisk, scoop, and ceramic bowl.", stock: 45 },
  { id: 50, name: "Smart Door Lock", price: 14399, category: "Home", rating: 4.7, reviews: 540, img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=500", badge: "Secure", desc: "Fingerprint, PIN, and app entry.", stock: 14 },
  { id: 51, name: "External SSD 1TB", price: 8799, category: "Electronics", rating: 4.8, reviews: 2200, img: "https://images.unsplash.com/photo-1597740985671-2a8a3b80ed00?q=80&w=500", badge: "Fast", desc: "NVMe speeds, rugged aluminum case.", stock: 40 },
  { id: 52, name: "Canvas Tote Bag", price: 2399, category: "Fashion", rating: 4.4, reviews: 1540, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500", badge: "Eco", desc: "Heavy canvas, internal pockets, reinforced handles.", stock: 100 },
  { id: 53, name: "Quinoa Puffs Snack", price: 799, category: "Food", rating: 4.5, reviews: 880, img: "https://images.unsplash.com/photo-1551462147-3a8877bc9443?q=80&w=500", badge: "", desc: "Aged cheddar flavor, high protein, gf.", stock: 200 },
  { id: 54, name: "Aromatherapy Diffuser", price: 3599, category: "Home", rating: 4.6, reviews: 670, img: "https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=500", badge: "Relax", desc: "Ultrasonic, wood grain, 7 light colors.", stock: 35 },
  { id: 55, name: "Tennis Racket Elite", price: 17599, category: "Sports", rating: 4.7, reviews: 230, img: "https://images.unsplash.com/photo-1617083275226-64606730a16c?q=80&w=500", badge: "Pro", desc: "Graphene 360+ tech, balanced control.", stock: 10 },
  { id: 56, name: "Webcam 4K Pro", price: 12799, category: "Electronics", rating: 4.6, reviews: 1420, img: "https://images.unsplash.com/photo-1588600036348-81861347071f?q=80&w=500", badge: "HDR", desc: "RightLight 3, dual mics, 90 deg field.", stock: 25 },
  { id: 57, name: "Linen Shirt", price: 4799, category: "Fashion", rating: 4.6, reviews: 890, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=500", badge: "Summer", desc: "100% European flax, garment dyed.", stock: 30 },
  { id: 58, name: "Balsamic Glaze 250ml", price: 1599, category: "Food", rating: 4.8, reviews: 310, img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500", badge: "Rich", desc: "Modena PGI, thick and sweet reduction.", stock: 50 },
  { id: 59, name: "Electric Toothbrush", price: 7199, category: "Home", rating: 4.7, reviews: 1100, img: "https://images.unsplash.com/photo-1559613663-712617631cc1?q=80&w=500", badge: "", desc: "Pressure sensor, 3 modes, smart timer.", stock: 40 },
  { id: 60, name: "Jump Rope Speed", price: 1199, category: "Sports", rating: 4.5, reviews: 2200, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500", badge: "", desc: "Ball bearing swivel, steel wire cable.", stock: 120 },
  { id: 61, name: "Monitor Light Bar", price: 5599, category: "Electronics", rating: 4.7, reviews: 432, img: "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=500", badge: "Eye Care", desc: "Asymmetric lighting, auto-dimming.", stock: 20 },
  { id: 62, name: "Denim Jacket Classic", price: 7999, category: "Fashion", rating: 4.5, reviews: 1540, img: "https://images.unsplash.com/photo-1527010154944-f2241763d806?q=80&w=500", badge: "", desc: "14oz raw denim, antique hardware.", stock: 25 },
  { id: 63, name: "Greek Olive Mix", price: 999, category: "Food", rating: 4.7, reviews: 880, img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500", badge: "", desc: "Kalamata & Green olives infused with herbs.", stock: 60 },
  { id: 64, name: "Memory Foam Pillow", price: 4399, category: "Home", rating: 4.6, reviews: 670, img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?q=80&w=500", badge: "", desc: "Cooling gel layer, orthopedic support.", stock: 30 },
  { id: 65, name: "Camping Stove Ultra", price: 3599, category: "Sports", rating: 4.6, reviews: 310, img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=500", badge: "Trek", desc: "Pocket-sized, wind-resistant, high output.", stock: 45 },
  { id: 66, name: "Power Bank 20Ah", price: 3999, category: "Electronics", rating: 4.8, reviews: 3100, img: "https://images.unsplash.com/photo-1619131649622-c32274472d80?q=80&w=500", badge: "Max", desc: "65W PD, charges laptops and phones.", stock: 50 },
  { id: 67, name: "Silk Pillowcase", price: 2799, category: "Home", rating: 4.8, reviews: 1420, img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500", badge: "Beauty", desc: "22 Momme silk, hair and skin benefits.", stock: 40 },
  { id: 68, name: "Leather Belt Heritage", price: 3999, category: "Fashion", rating: 4.7, reviews: 654, img: "https://images.unsplash.com/photo-1614165936126-2ed18e471b1b?q=80&w=500", badge: "", desc: "Vegetable tanned, solid brass buckle.", stock: 35 },
  { id: 69, name: "Dark Roast Cold Brew", price: 299, category: "Food", rating: 4.6, reviews: 1540, img: "https://images.unsplash.com/photo-1559056191-7440026e6415?q=80&w=500", badge: "", desc: "Nitro-infused, zero sugar, dairy-free.", stock: 100 },
  { id: 70, name: "Kitchen Scale Digital", price: 1599, category: "Home", rating: 4.5, reviews: 890, img: "https://images.unsplash.com/photo-1506484334402-466986b1f01a?q=80&w=500", badge: "Kitchen", desc: "Precise sensors, LCD display, tare function.", stock: 60 },
  { id: 71, name: "Bike Frame Bag", price: 3199, category: "Sports", rating: 4.4, reviews: 432, img: "https://images.unsplash.com/photo-1501147830916-ce44a6359892?q=80&w=500", badge: "", desc: "Waterproof, easy install, 2L capacity.", stock: 25 },
  { id: 72, name: "USB-C Hub (7-in-1)", price: 3199, category: "Electronics", rating: 4.6, reviews: 1100, img: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?q=80&w=500", badge: "Work", desc: "4K HDMI, SD Reader, 100W PD.", stock: 30 },
  { id: 73, name: "Cotton Chinos", price: 3999, category: "Fashion", rating: 4.5, reviews: 880, img: "https://images.unsplash.com/photo-1473966968600-fa804b86d30b?q=80&w=500", badge: "", desc: "Slim fit, stretch cotton twill.", stock: 40 },
  { id: 74, name: "Avocado Oil 500ml", price: 1199, category: "Food", rating: 4.8, reviews: 540, img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500", badge: "Healthy", desc: "High smoke point, 100% pure.", stock: 50 },
  { id: 75, name: "Wine Aerator Elite", price: 1999, category: "Home", rating: 4.7, reviews: 310, img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=500", badge: "", desc: "Instant aeration, no-drip stand.", stock: 30 },
  { id: 76, name: "Golf Balls (12pk)", price: 3599, category: "Sports", rating: 4.8, reviews: 670, img: "https://images.unsplash.com/photo-1531694611353-d4758f86fa6d?q=80&w=500", badge: "Pro", desc: "High launch, low spin for driver distance.", stock: 50 },
  { id: 77, name: "Trackball Mouse", price: 6399, category: "Electronics", rating: 4.6, reviews: 432, img: "https://images.unsplash.com/photo-1527864550417-7fd91e984f93?q=80&w=500", badge: "Ergo", desc: "Adjustable angle, dual connectivity.", stock: 15 },
  { id: 78, name: "Beanie Ribbed Knit", price: 1599, category: "Fashion", rating: 4.4, reviews: 1540, img: "https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?q=80&w=500", badge: "", desc: "Soft acrylic blend, fold-up cuff.", stock: 80 },
  { id: 79, name: "Stevia Drops Liquid", price: 999, category: "Food", rating: 4.6, reviews: 880, img: "https://images.unsplash.com/photo-1558611997-d86e0018f6d2?q=80&w=500", badge: "Keto", desc: "Zero calorie sweetener, vanilla flavor.", stock: 100 },
  { id: 80, name: "Storage Bins (3)", price: 2399, category: "Home", rating: 4.7, reviews: 1420, img: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?q=80&w=500", badge: "", desc: "Stackable, clear lids, woven texture.", stock: 60 },
  { id: 81, name: "Ski Goggles HD", price: 7199, category: "Sports", rating: 4.6, reviews: 310, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500", badge: "Winter", desc: "Dual layer lens, OTG compatible.", stock: 20 },
  { id: 82, name: "Keyboard Wrist Rest", price: 1999, category: "Electronics", rating: 4.5, reviews: 670, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=500", badge: "", desc: "Memory foam, non-slip base.", stock: 35 },
  { id: 83, name: "Linen Bedding", price: 11999, category: "Home", rating: 4.8, reviews: 210, img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500", badge: "Lux", desc: "Premium French flax linen, pre-washed.", stock: 10 },
  { id: 84, name: "Polar Fleece Vest", price: 3199, category: "Fashion", rating: 4.5, reviews: 890, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500", badge: "", desc: "Lightweight, zip-up, moisture wicking.", stock: 40 },
  { id: 85, name: "Himalayan Pink Salt", price: 599, category: "Food", rating: 4.9, reviews: 3100, img: "https://images.unsplash.com/photo-1504309325066-88d44747716f?q=80&w=500", badge: "Pure", desc: "Coarse grain, mineral rich salt.", stock: 150 },
  { id: 86, name: "Electric Milk Frother", price: 1599, category: "Home", rating: 4.6, reviews: 1540, img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500", badge: "Latte", desc: "Handheld, stainless whisk, dual speed.", stock: 80 },
  { id: 87, name: "Bicycle U-Lock", price: 3999, category: "Sports", rating: 4.7, reviews: 654, img: "https://images.unsplash.com/photo-1501147830916-ce44a6359892?q=80&w=500", badge: "Security", desc: "16mm hardened steel, double deadbolt.", stock: 30 },
  { id: 88, name: "Soundbar Compact", price: 10399, category: "Electronics", rating: 4.5, reviews: 880, img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=500", badge: "TV", desc: "2.1 Channel, built-in subwoofer, Bluetooth.", stock: 25 },
  { id: 89, name: "Silk Eye Mask", price: 1199, category: "Home", rating: 4.7, reviews: 1100, img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500", badge: "Sleep", desc: "Pure silk, light blocking, adjustable strap.", stock: 50 },
  { id: 90, name: "Suede Sneakers", price: 7199, category: "Fashion", rating: 4.6, reviews: 540, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500", badge: "", desc: "Italian suede, cupsole construction.", stock: 18 },
  { id: 91, name: "Organic Coconut Water", price: 249, category: "Food", rating: 4.8, reviews: 2200, img: "https://images.unsplash.com/photo-1551462147-3a8877bc9443?q=80&w=500", badge: "Hydrate", desc: "Single source, no pulp, unsweetened.", stock: 200 },
  { id: 92, name: "Non-Stick Frying Pan", price: 2799, category: "Home", rating: 4.5, reviews: 670, img: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=500", badge: "", desc: "Ceramic coating, PFOA free, induction base.", stock: 45 },
  { id: 93, name: "Diving Fins Pro", price: 5599, category: "Sports", rating: 4.6, reviews: 230, img: "https://images.unsplash.com/photo-1559136555-930d7bc9e322?q=80&w=500", badge: "Pool", desc: "Adjustable strap, high thrust design.", stock: 20 },
  { id: 94, name: "Smart Plug (2pk)", price: 1999, category: "Electronics", rating: 4.7, reviews: 1420, img: "https://images.unsplash.com/photo-1550524513-3170cc681f3d?q=80&w=500", badge: "Smart", desc: "Energy monitoring, away mode, app control.", stock: 60 },
  { id: 95, name: "Wool Socks (3pk)", price: 2399, category: "Fashion", rating: 4.8, reviews: 890, img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=500", badge: "Warm", desc: "Merino wool blend, cushioned heel.", stock: 100 },
  { id: 96, name: "Pesto Genovese", price: 559, category: "Food", rating: 4.7, reviews: 432, img: "https://images.unsplash.com/photo-1546549032-951fd4f16b60?q=80&w=500", badge: "Fresh", desc: "Basil, pine nuts, parmigiano reggiano.", stock: 80 },
  { id: 97, name: "Air Fryer XL", price: 10399, category: "Home", rating: 4.8, reviews: 1100, img: "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=500", badge: "Hot", desc: "5.8qt capacity, digital touch presets.", stock: 15 },
  { id: 98, name: "Climbing Shoes Pro", price: 11199, category: "Sports", rating: 4.7, reviews: 540, img: "https://images.unsplash.com/photo-1522158633578-96400d72e453?q=80&w=500", badge: "Peak", desc: "Aggressive downturn, sticky rubber sole.", stock: 12 },
  { id: 99, name: "Portable SSD 500GB", price: 5599, category: "Electronics", rating: 4.6, reviews: 880, img: "https://images.unsplash.com/photo-1597740985671-2a8a3b80ed00?q=80&w=500", badge: "", desc: "Pocket-sized, USB 3.2, drop resistant.", stock: 40 },
  { id: 100, name: "Cotton Hand Towels", price: 1599, category: "Home", rating: 4.5, reviews: 670, img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500", badge: "Soft", desc: "Set of 4, highly absorbent, combed cotton.", stock: 150 },
];

const CATEGORIES = ["All", "Electronics", "Fashion", "Food", "Sports", "Home"];
const HERO_BGS = ["/images/hero_bg_1.png", "/images/hero_bg_2.png", "/images/hero_bg_3.png"];

const TECH_STACK = [
  { name: "React", color: "#61DAFB", icon: "⚛️", role: "UI Framework", desc: "State-driven modular architecture" },
  { name: "Next.js", color: "#818CF8", icon: "▲", role: "Core Engine", desc: "Optimized SSR and edge routing" },
  { name: "Claude AI", color: "#F43F5E", icon: "🤖", role: "AI Assistant", desc: "Intelligent product curation" },
  { name: "Framer", color: "#A855F7", icon: "✨", role: "Design", desc: "Fluid motion and micro-interactions" },
  { name: "Node.js", color: "#10B981", icon: "🟢", role: "Backend", desc: "High-performance event loop" },
  { name: "Vite", color: "#D97706", icon: "⚡", role: "Bundler", desc: "Lightning fast development" },
];

// ── CUSTOM HOOKS ──────────────────────────────────────────────────────────────
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });
  const setValue = (value) => {
    try {
      const v = value instanceof Function ? value(storedValue) : value;
      setStoredValue(v);
      window.localStorage.setItem(key, JSON.stringify(v));
    } catch (e) { console.error(e); }
  };
  return [storedValue, setValue];
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────
const Shimmer = () => (
  <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#f1f5f9" }}>
    <motion.div initial={{ x: "-100%" }} animate={{ x: "200%" }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
  </div>
);

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useLocalStorage("shopai-cart-v2", []);
  const [wishlist, setWishlist] = useLocalStorage("shopai-wishlist-v2", []);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("shopai-theme-v2", false);
  const [user, setUser] = useLocalStorage("shopai-user", null);
  
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [aiOpen, setAiOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState(80000);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imgLoaded, setImgLoaded] = useState({});

  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);

  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "👋 Hi! I'm ShopAI. I can help you find products, compare specs, or suggest the perfect bundle! What are you looking for today?" }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const aiEndRef = useRef(null);

  // Interval for Hero Slider
  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(s => (s + 1) % HERO_BGS.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(x => x.id === p.id);
      if (ex) return prev.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...p, qty: 1 }];
    });
    notify(`🛒 ${p.name} added to cart!`);
  };

  const toggleWishlist = (p) => {
    setWishlist(prev => prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(x => x.id !== id));
  const updateQty = (id, delta) => setCart(prev => prev.map(x => x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x));

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  let filtered = PRODUCTS
    .filter(p => category === "All" || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => p.price <= priceRange);

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const sendAI = async () => {
    if (!aiInput.trim() || aiLoading) return;
    const userMsg = { role: "user", content: aiInput };
    setAiMessages(prev => [...prev, userMsg]);
    setAiInput("");
    setAiLoading(true);

    // Dynamic Bundle Suggester
    const isBundleReq = aiInput.toLowerCase().includes("bundle") || aiInput.toLowerCase().includes("suggest");
    const suggested = isBundleReq ? PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)] : null;

    setTimeout(() => {
      let reply = "I can definitely help with that! ShopAI is designed to find you the best deals.";
      if (suggested) reply = `Based on your request, I highly recommend the **${suggested.name}**. It's currently trending in ${suggested.category} and would make a great addition to your setup!`;
      setAiMessages(prev => [...prev, { role: "assistant", content: reply }]);
      setAiLoading(false);
    }, 1200);
  };

  useEffect(() => aiEndRef.current?.scrollIntoView({ behavior: "smooth" }), [aiMessages, aiLoading]);

  const t = isDarkMode ? darkTheme : lightTheme;
  const s = getStyles(t);

  return (
    <div style={s.root}>
      {/* NOTIFICATION */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 50, opacity: 0 }} style={s.notif}>
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <motion.div whileHover={{ scale: 1.05 }} style={s.logo} onClick={() => setPage("home")}>
            <span style={s.logoIcon}>⚡</span>
            <span style={s.logoText}>Shop<span style={{ color: t.primary }}>AI</span></span>
          </motion.div>
          <div style={s.navLinks}>
            {["home", "stack", "cart"].map(p => (
              <button key={p} onClick={() => setPage(p)} style={{ ...s.navBtn, ...(page === p ? s.navBtnActive : {}) }}>
                {p === "cart" ? `🛒 ${cartCount > 0 ? `(${cartCount})` : "Cart"}` : p === "stack" ? "🛠️ Architecture" : "🏠 Store"}
              </button>
            ))}
            {user ? (
              <button onClick={() => setPage("profile")} style={{ ...s.navBtn, ...(page === "profile" ? s.navBtnActive : {}) }}>👤 {user.name}</button>
            ) : (
              <button onClick={() => setPage("login")} style={{ ...s.navBtn, ...(page === "login" ? s.navBtnActive : {}) }}>🔑 Login</button>
            )}
            <button onClick={() => setIsDarkMode(!isDarkMode)} style={s.themeToggle}>{isDarkMode ? "☀️ Light" : "🌙 Dark"}</button>
          </div>
          <button style={s.aiBtn} onClick={() => setAiOpen(o => !o)}>🤖 AI Chat</button>
        </div>
      </nav>

      {/* AI PANEL */}
      <AnimatePresence>
        {aiOpen && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} style={s.aiPanel}>
            <div style={s.aiHeader}><span>🤖 ShopAI Concierge</span><button onClick={() => setAiOpen(false)} style={s.aiClose}>✕</button></div>
            <div style={s.aiBody}>
              {aiMessages.map((m, i) => (
                <div key={i} style={{ ...s.aiMsg, ...(m.role === "user" ? s.aiMsgUser : s.aiMsgBot) }}>
                  <div style={{ ...s.aiMsgBubble, ...(m.role === "user" ? s.aiMsgBubbleUser : s.aiMsgBubbleBot) }}>{m.content}</div>
                </div>
              ))}
              {aiLoading && <div style={{ padding: 12 }}><Shimmer /></div>}
              <div ref={aiEndRef} />
            </div>
            <div style={s.aiFooter}>
              <input value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendAI()} placeholder="Ask something..." style={s.aiInput} />
              <button onClick={sendAI} style={s.aiSend}>➤</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={s.content}>
        {page === "home" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* HERO */}
            <div style={s.hero}>
              <div style={{ ...s.heroSlider, transform: `translateX(-${currentSlide * 33.333}%)` }}>
                {HERO_BGS.map((bg, i) => <img key={i} src={bg} alt="" style={s.heroSlide} />)}
              </div>
              <div style={s.heroOverlay} />
              <div style={s.heroContent}>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={s.heroTag}>✨ Next-Gen Shopping</motion.div>
                <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={s.heroTitle}>The Future of<br /><span style={s.heroGrad}>E-Commerce</span></motion.h1>
                <div style={s.heroBtns}>
                  <button style={s.heroBtnPrimary} onClick={() => setQuizOpen(true)}>Start AI Style Quiz</button>
                  <button style={s.heroBtnSecondary} onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>Browse Store</button>
                </div>
              </div>
            </div>

            {/* SEARCH / FILTERS */}
            <div id="products" style={s.filterBar}>
              <div style={s.filterRow}>
                <div style={s.semanticSearch}>
                   <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: t.primary }}>🤖</span>
                   <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Try 'Find me gadgets for a minimalist office'..." style={s.searchInput} />
                </div>
                <select value={sort} onChange={e => setSort(e.target.value)} style={s.select}>
                   <option value="popular">Popularity</option>
                   <option value="rating">Top Rated</option>
                   <option value="price-asc">Price: Low-High</option>
                </select>
              </div>
              <div style={s.catRow}>
                {CATEGORIES.map(c => <button key={c} onClick={() => setCategory(c)} style={{ ...s.catBtn, ...(category === c ? s.catBtnActive : {}) }}>{c}</button>)}
                <div style={s.priceFilter}><span>Max: ₹{priceRange}</span><input type="range" min={500} max={80000} value={priceRange} onChange={e => setPriceRange(+e.target.value)} style={s.range} /></div>
              </div>
            </div>

            {/* GRID */}
            <div style={s.grid}>
              {filtered.map((p, i) => (
                <motion.div key={p.id} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.1 }}
                  style={s.card} onClick={() => setSelectedProduct(p)}>
                  {p.badge && <div style={s.badge}>{p.badge}</div>}
                  <div style={s.cardImgOuter}>
                    {!imgLoaded[p.id] && <Shimmer />}
                    <img src={p.img} alt="" style={{ ...s.cardImg, display: imgLoaded[p.id] ? "block" : "none" }} onLoad={() => setImgLoaded(prev => ({ ...prev, [p.id]: true }))} />
                  </div>
                  <div style={s.cardCat}>{p.category}</div>
                  <div style={s.cardName}>{p.name}</div>
                  <div style={s.cardBottom}><div style={s.cardPrice}>₹{p.price}</div><button style={s.addBtn} onClick={e => { e.stopPropagation(); addToCart(p); }}>+ Cart</button></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {page === "stack" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "40px 0" }}>
            <h2 style={s.pageTitle}>🛠️ Live Architecture</h2>
            <div style={s.stackGrid}>
               {TECH_STACK.map((tech, i) => (
                 <motion.div key={tech.name} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1 }}
                   whileHover={{ y: -10 }} style={s.stackCard}>
                   <div style={{ fontSize: 48, marginBottom: 16 }}>{tech.icon}</div>
                   <h3 style={{ color: tech.color, fontWeight: 900 }}>{tech.name}</h3>
                   <div style={{ color: t.textSecondary, fontSize: 13, marginTop: 4 }}>{tech.role}</div>
                   <p style={{ color: t.textSecondary, fontSize: 12, marginTop: 12 }}>{tech.desc}</p>
                   <div style={s.dataPulse} />
                 </motion.div>
               ))}
            </div>
          </motion.div>
        )}

        {page === "cart" && (
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={s.cartPage}>
            <h2 style={s.pageTitle}>Your Cart ({cartCount})</h2>
            {cart.length === 0 ? <div style={s.empty}>Your cart is lonely.</div> : (
              <div style={s.cartLayout}>
                <div style={s.cartItems}>{cart.map(item => (
                  <div key={item.id} style={s.cartItem}>
                    <img src={item.img} alt="" style={s.cartItemImg} />
                    <div style={s.cartItemInfo}><div>{item.name}</div><div style={{ color: t.primary, fontWeight: 900 }}>₹{item.price}</div></div>
                    <div style={s.qtyControl}><button onClick={() => updateQty(item.id, -1)}>−</button><span>{item.qty}</span><button onClick={() => updateQty(item.id, 1)}>+</button></div>
                    <button onClick={() => removeFromCart(item.id)} style={s.removeBtn}>🗑️</button>
                  </div>
                ))}</div>
                <div style={s.cartSummary}>
                  <div style={s.summaryRow}><span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span></div>
                  <div style={s.summaryRow}><span>Tax</span><span>₹{(cartTotal * 0.08).toFixed(2)}</span></div>
                  <div style={{ ...s.summaryRow, borderTop: `1px solid ${t.border}`, marginTop: 16, paddingTop: 16, fontWeight: 900, color: t.textPrimary, fontSize: 20 }}>
                    <span>Total</span><span>₹{(cartTotal * 1.08).toFixed(2)}</span></div>
                  <button style={s.checkoutBtn} onClick={() => setPage("payment")}>Checkout</button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {page === "payment" && (
          <Payment 
            cart={cart} 
            total={cartTotal} 
            theme={t} 
            onPaymentComplete={() => {
              setCart([]);
              setPage("home");
              notify("🚀 Payment successful! Your order is being processed by AI bots.");
            }} 
          />
        )}

        {page === "login" && (
          <Login 
            theme={t} 
            onLogin={(u) => { setUser(u); setPage("home"); notify(`👋 Welcome back, ${u.name}!`); }} 
            onSwitchToSignup={() => setPage("signup")} 
          />
        )}

        {page === "signup" && (
          <Signup 
            theme={t} 
            onSignup={(u) => { setUser(u); setPage("home"); notify(`🎉 Account created! Welcome, ${u.name}!`); }} 
            onSwitchToLogin={() => setPage("login")} 
          />
        )}

        {page === "profile" && (
          <Profile 
            user={user} 
            theme={t} 
            onLogout={() => { setUser(null); setPage("home"); notify("👋 Logged out successfully."); }} 
          />
        )}
      </main>

      {/* QUIZ MODAL */}
      <AnimatePresence>
        {quizOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={s.modalOverlay}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} style={s.modal}>
              <button onClick={() => setQuizOpen(false)} style={s.modalClose}>✕</button>
              <h2 style={{ fontWeight: 900, marginBottom: 12 }}>AI Style Quiz</h2>
              {quizStep === 0 ? (
                <div>
                  <p style={{ color: t.textSecondary, marginBottom: 24 }}>What defines your ideal workspace?</p>
                  <div style={s.quizGrid}>
                    {["Minimalist", "High-Tech", "Cozy", "Productive"].map(o => <button key={o} onClick={() => setQuizStep(1)} style={s.quizBtn}>{o}</button>)}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                   <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ fontSize: 48, marginBottom: 20 }}>🧠</motion.div>
                   <h3>AI is generating your profile...</h3>
                   <button onClick={() => setQuizOpen(false)} style={{ ...s.heroBtnPrimary, marginTop: 24 }}>See Results</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={s.modalOverlay} onClick={() => setSelectedProduct(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} style={s.modal} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedProduct(null)} style={s.modalClose}>✕</button>
              <div style={s.modalImgOuter}>
                 {!imgLoaded[`modal-${selectedProduct.id}`] && <Shimmer />}
                 <img src={selectedProduct.img} alt="" style={{ ...s.modalImg, display: imgLoaded[`modal-${selectedProduct.id}`] ? "block" : "none" }} onLoad={() => setImgLoaded(prev => ({ ...prev, [`modal-${selectedProduct.id}`]: true }))} />
              </div>
              <h2 style={{ fontWeight: 900, fontSize: 28, marginBottom: 8 }}>{selectedProduct.name}</h2>
              <div style={s.sentimentBox}>
                <span style={{ fontSize: 11, fontWeight: 900, color: t.primary }}>🤖 AI SENTIMENT</span>
                <p style={{ fontSize: 14, marginTop: 4 }}>"Customers love the <strong>ergonomic design</strong> and <strong>premium feel</strong> of this item. Highly recommended for daily use!"</p>
              </div>
              <p style={{ color: t.textSecondary, lineHeight: 1.6, marginBottom: 24 }}>{selectedProduct.desc}</p>
              <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 24 }}>₹{selectedProduct.price}</div>
              <button style={{ ...s.heroBtnPrimary, width: "100%" }} onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>Add to Cart</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── THEMES ──────────────────────────────────────────────────────────────────
const lightTheme = { primary: "#4F46E5", bg: "#F8FAFC", surface: "#FFFFFF", textPrimary: "#0F172A", textSecondary: "#64748B", border: "#E2E8F0" };
const darkTheme = { primary: "#818CF8", bg: "#020617", surface: "#0F172A", textPrimary: "#F8FAFC", textSecondary: "#94A3B8", border: "#1E293B" };

// ── STYLES ────────────────────────────────────────────────────────────────────
const getStyles = (t) => ({
  root: { minHeight: "100vh", background: t.bg, color: t.textPrimary, fontFamily: "'Inter', sans-serif" },
  notif: { position: "fixed", top: 80, right: 20, zIndex: 1000, background: t.primary, color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 800, boxShadow: "0 10px 15px rgb(0 0 0 / 0.2)" },
  
  nav: { position: "sticky", top: 0, zIndex: 100, background: t.surface + "cc", backdropFilter: "blur(20px)", borderBottom: `1px solid ${t.border}` },
  navInner: { maxWidth: 1200, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer" },
  logoIcon: { fontSize: 24, padding: "4px", background: t.bg, borderRadius: 8 },
  logoText: { fontSize: 24, fontWeight: 900, letterSpacing: -1 },
  navLinks: { display: "flex", gap: 8, alignItems: "center" },
  navBtn: { background: "none", border: "none", color: t.textSecondary, padding: "8px 16px", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13.5 },
  navBtnActive: { background: t.bg, color: t.textPrimary, border: `1px solid ${t.border}` },
  themeToggle: { background: t.bg, border: `1px solid ${t.border}`, color: t.textPrimary, padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 800 },
  aiBtn: { background: t.primary, color: "#fff", border: "none", padding: "8px 24px", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 13.5 },

  aiPanel: { position: "fixed", right: 20, bottom: 20, width: 350, height: 500, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 28, zIndex: 200, display: "flex", flexDirection: "column", boxShadow: "0 25px 30px -10px rgb(0 0 0 / 0.15)" },
  aiHeader: { padding: "16px 20px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", fontWeight: 900, color: t.primary },
  aiClose: { background: "none", border: "none", color: t.textSecondary, fontSize: 18, cursor: "pointer" },
  aiBody: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12 },
  aiMsg: { display: "flex", gap: 8 },
  aiMsgUser: { flexDirection: "row-reverse" },
  aiMsgBubble: { maxWidth: "85%", padding: "12px 16px", borderRadius: 20, fontSize: 13.5, lineHeight: 1.5 },
  aiMsgBubbleUser: { background: t.primary, color: "#fff" },
  aiMsgBubbleBot: { background: t.bg, border: `1px solid ${t.border}` },
  aiFooter: { padding: "12px", borderTop: `1px solid ${t.border}`, display: "flex", gap: 8 },
  aiInput: { flex: 1, background: t.bg, border: `1px solid ${t.border}`, color: t.textPrimary, borderRadius: 12, padding: "10px 14px", outline: "none" },
  aiSend: { background: t.primary, color: "#fff", border: "none", borderRadius: 12, padding: "8px 16px" },

  content: { maxWidth: 1200, margin: "0 auto", padding: "0 20px 80px" },
  hero: { position: "relative", minHeight: 520, borderRadius: 52, margin: "40px 0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" },
  heroSlider: { display: "flex", width: "300%", height: "100%", position: "absolute", inset: 0, zIndex: 0, transition: "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)" },
  heroSlide: { width: "33.333%", height: "100%", objectFit: "cover" },
  heroOverlay: { position: "absolute", inset: 0, background: `linear-gradient(${t.surface}99, ${t.surface}ee)`, zIndex: 1 },
  heroContent: { position: "relative", zIndex: 2, textAlign: "center", maxWidth: 700 },
  heroTag: { display: "inline-block", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 24, padding: "6px 18px", fontSize: 11, fontWeight: 900, color: t.primary, marginBottom: 20 },
  heroTitle: { fontSize: "clamp(48px, 8vw, 92px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: -5, margin: "0 0 24px" },
  heroGrad: { background: `linear-gradient(135deg, ${t.primary}, #F43F5E)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroBtns: { display: "flex", gap: 12, justifyContent: "center" },
  heroBtnPrimary: { background: t.textPrimary, color: t.bg, border: "none", padding: "16px 36px", borderRadius: 16, fontSize: 16, fontWeight: 800, cursor: "pointer" },
  heroBtnSecondary: { background: "none", border: `2px solid ${t.border}`, color: t.textPrimary, padding: "16px 36px", borderRadius: 16, fontSize: 16, fontWeight: 800, cursor: "pointer" },

  filterBar: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 32, padding: "28px", marginBottom: 40, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  filterRow: { display: "flex", gap: 12, marginBottom: 16 },
  semanticSearch: { flex: 1, position: "relative" },
  searchInput: { width: "100%", background: t.bg, border: `1px solid ${t.border}`, color: t.textPrimary, borderRadius: 16, padding: "14px 16px 14px 44px", outline: "none", fontSize: 15 },
  select: { background: t.bg, border: `1px solid ${t.border}`, color: t.textPrimary, borderRadius: 16, padding: "12px 16px" },
  catRow: { display: "flex", gap: 8, alignItems: "center" },
  catBtn: { background: t.surface, border: `1px solid ${t.border}`, color: t.textSecondary, borderRadius: 100, padding: "8px 20px", fontSize: 14, fontWeight: 700 },
  catBtnActive: { background: t.textPrimary, color: t.bg, borderColor: t.textPrimary },
  priceFilter: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, color: t.textSecondary, fontSize: 13, fontWeight: 700 },
  range: { accentColor: t.primary },

  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 24 },
  card: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 36, padding: "22px", cursor: "pointer", position: "relative" },
  badge: { position: "absolute", top: 18, left: 18, background: t.primary, color: "#fff", borderRadius: 10, padding: "4px 12px", fontSize: 10.5, fontWeight: 900, zIndex: 5 },
  cardImgOuter: { width: "100%", aspectRatio: "1/1", borderRadius: 24, marginBottom: 18, overflow: "hidden", background: t.bg },
  cardImg: { width: "100%", height: "100%", objectFit: "cover" },
  cardCat: { color: t.primary, fontSize: 10.5, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 },
  cardName: { fontSize: 19, fontWeight: 800, marginBottom: 6 },
  cardBottom: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 18, borderTop: `1px solid ${t.border}`, marginTop: 14 },
  cardPrice: { fontSize: 24, fontWeight: 900 },
  addBtn: { background: t.textPrimary, color: t.bg, border: "none", borderRadius: 14, padding: "10px 20px", fontWeight: 800, fontSize: 14 },

  modalOverlay: { position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(16px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modal: { background: t.surface, borderRadius: 44, padding: "44px", maxWidth: 480, width: "100%", position: "relative", boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3)" },
  modalClose: { position: "absolute", top: 28, right: 28, background: t.bg, border: "none", borderRadius: "50%", width: 48, height: 48, cursor: "pointer", color: t.textPrimary },
  modalImgOuter: { width: "100%", aspectRatio: "1/1", background: t.bg, borderRadius: 28, marginBottom: 28, overflow: "hidden" },
  modalImg: { width: "100%", height: "100%", objectFit: "cover" },
  sentimentBox: { background: t.bg, border: `1px solid ${t.border}`, borderRadius: 16, padding: "16px", marginBottom: 20 },

  cartPage: { padding: "40px 0" },
  pageTitle: { fontSize: 40, fontWeight: 900, letterSpacing: -2, marginBottom: 40 },
  cartLayout: { display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 },
  cartItems: { display: "flex", flexDirection: "column", gap: 16 },
  cartItem: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 32, padding: "20px", display: "flex", alignItems: "center", gap: 20 },
  cartItemImg: { width: 80, height: 80, borderRadius: 16, objectFit: "cover" },
  cartItemInfo: { flex: 1, fontWeight: 800 },
  qtyControl: { background: t.bg, borderRadius: 12, padding: "6px 12px", display: "flex", gap: 12, alignItems: "center", fontWeight: 800 },
  removeBtn: { background: "none", border: "none", color: t.textSecondary, fontSize: 18 },
  cartSummary: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 36, padding: "32px", position: "sticky", top: 100 },
  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: 12, color: t.textSecondary, fontWeight: 600 },
  checkoutBtn: { background: t.primary, color: "#fff", border: "none", width: "100%", padding: "18px", borderRadius: 18, fontWeight: 900, fontSize: 17, marginTop: 24, cursor: "pointer" },

  stackGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 },
  stackCard: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 36, padding: "48px 32px", textAlign: "center", position: "relative", overflow: "hidden" },
  dataPulse: { position: "absolute", bottom: 0, left: 0, width: "100%", height: 3, background: t.primary, opacity: 0.2 },
  quizGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  quizBtn: { background: t.bg, border: `1px solid ${t.border}`, color: t.textPrimary, padding: "20px", borderRadius: 20, fontWeight: 800, cursor: "pointer" },
  empty: { textAlign: "center", padding: "100px 0", fontSize: 24, color: t.textSecondary, fontWeight: 700 },
});
