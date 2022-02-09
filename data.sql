-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: mysql.stud.ntnu.no
-- Generation Time: Nov 21, 2021 at 06:09 PM
-- Server version: 5.7.36-0ubuntu0.16.04.1+esm1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sabjorns_prosjekt`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `release_date` date DEFAULT NULL,
  `genre` enum('Real-Time Strategy','First Person Shooter','Third Person Shooter','Multiplayer Online Battle-Arena','Role Playing Game','Action Role Playing Game','Sports Game','Puzzle Game','Action Adventure Game') DEFAULT NULL,
  `platform` set('PlayStation 5','Xbox Series X','PC','Nintendo Switch') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `title`, `description`, `release_date`, `genre`, `platform`) VALUES
(1, 'Gunfire Reborn', 'Gunfire Reborn is an adventure level-based game featured with FPS, Roguelite and RPG. Players can control heros with various abilities to experience diverse Build gameplay, use randomly dropped weapons to explore random levels. ', '2020-05-23', 'First Person Shooter', 'PlayStation 5,Xbox Series X,PC'),
(2, 'Zombie Army 4: Dead War', 'Hitler’s hordes are back for more in this spine-chilling shooter from the makers of Sniper Elite 4! Abominable occult enemies, epic weapons and a harrowing new campaign in 1940s Europe, as you fight to save humankind from undead Armageddon!', '2021-02-18', 'Real-Time Strategy', 'PC'),
(3, 'Fall Guys: Ultimate Knockout', 'Fall Guys: Ultimate Knockout flings hordes of contestants together online in a mad dash through round after round of escalating chaos until one victor remains! Battle bizarre obstacles and shove through unruly competitors.', '2020-08-04', 'Sports Game', 'PC'),
(4, 'Lethal League', 'Lethal League - the opportunity to express the most criminal desires. For example, to pierce the face of your opponent. But not directly - in the process of playing baseball.', '2014-08-27', 'Sports Game', 'Xbox Series X'),
(5, 'The Elder Scrolls V: Skyrim Special Edition', 'This Special Edition includes the critically acclaimed game and add-ons with all-new features like remastered art and effects, volumetric god rays, dynamic depth of field, screen-space reflections, and more.', '2016-10-28', 'Action Adventure Game', 'PlayStation 5,PC'),
(6, 'Brutal Legends', 'Brutal Legend is an action-adventure that marries visceral action combat with open-world freedom. Set in a universe somewhere between Lord of the Rings and Spinal Tap, it’s a fresh take on the action/driving genre.', '2009-10-12', 'Real-Time Strategy', 'PlayStation 5'),
(7, 'The Witcher 3: Wild Hunt', 'Adventures of the renowned monster slayer Geralt of Rivia. This time Geralt is trying to find the child of the prophecy, Ciri while making a quick coin from various contracts on the side.', '2015-05-18', 'Role Playing Game', 'Xbox Series X'),
(8, 'Portal', 'Portal is a new single player game from Valve. Set in the mysterious Aperture Science Laboratories, Portal has been called one of the most innovative new games on the horizon and will offer gamers hours of unique gameplay.', '2007-10-09', 'Puzzle Game', 'PlayStation 5'),
(9, 'Halo 5', 'Cool space marines game - Now with laser swords', '2021-11-05', 'First Person Shooter', 'PlayStation 5,Xbox Series X,PC'),
(10, 'Rocket League', 'Rocket League is a high-powered hybrid of arcade-style soccer and vehicular mayhem with easy-to-understand controls and fluid, physics-driven competition. ', '2015-07-07', 'Sports Game', 'Xbox Series X'),
(11, 'Hotline Miami 2: Wrong Number', 'Hotline Miami 2: Wrong Number is the brutal conclusion to the Hotline Miami saga, set against a backdrop of escalating violence and retribution over spilled blood in the original game.', '2015-03-10', 'Role Playing Game', 'Nintendo Switch'),
(12, 'Grand Theft Auto V', 'Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.', '2015-04-14', 'Action Adventure Game', 'Xbox Series X'),
(13, 'Red Dead Redemption 2', 'RDR2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age. Also includes access to the shared living world of Red Dead Online.', '2019-12-05', 'Action Adventure Game', 'PlayStation 5'),
(14, 'Cities: Skylines', 'Cities: Skylines is a modern take on the classic city simulation. The game realizes the thrill and hardships of creating and maintaining a real city whilst expanding on some well-established tropes of the city building experience.', '2015-03-10', 'Real-Time Strategy', 'PC'),
(15, 'Tom Raider', 'Tomb Raider explores the intense origin story of Lara Croft and her ascent from a young woman to a hardened survivor.', '2013-03-05', 'Action Role Playing Game', 'PlayStation 5'),
(16, 'Battlefield 2042', 'Battlefield™ 2042 is a first-person shooter. In a near-future world transformed by disorder, adapt and overcome dynamically-changing battlegrounds with the help of your squad and a cutting-edge arsenal.', '2021-11-19', 'Action Role Playing Game', 'Xbox Series X'),
(17, 'DiRT Rally 2.0', 'DiRT Rally 2.0 dares you to carve your way through a selection of iconic rally locations from across the globe, in the most powerful off-road vehicles ever made, knowing that the smallest mistake could end your stage.', '2019-02-26', 'Sports Game', 'PC'),
(18, 'GRID', 'GRID is a racing experience like no other. Offering unrivalled wheel-to-wheel racing for everyone, where every race is unpredictable as you create rivals and nemeses on your road to conquering the world of motorsport.', '2019-10-10', 'Sports Game', 'Xbox Series X'),
(19, 'Counter-Strike: Source', 'Counter-Strike: Source blends Counter-Strike\'s award-winning teamplay action with the advanced technology of Source™ technology.', '2004-11-01', 'Third Person Shooter', 'PC'),
(20, 'Need for Speed Heat', 'Hustle by day and risk it all at night in Need for Speed™ Heat Deluxe Edition, a white-knuckle street racer, where the lines of the law fade as the sun starts to set.', '2019-11-08', 'Sports Game', 'PC'),
(21, 'Wreckfest', 'Wreckfest is a demolition derby themed racing game with soft-body damage modeling, sophisticated driving dynamics and in-depth vehicle upgrading, featuring both demolition derbies and more traditional track races.', '2018-06-14', 'Sports Game', 'PlayStation 5'),
(22, 'Life is Strange: True Colors', 'Alex Chen hides her \'curse\': the psychic power of Empathy, the ability to absorb the emotions of others. When her brother dies in a so-called accident, Alex must embrace her power to find the truth.', '2021-09-09', 'Action Adventure Game', 'Xbox Series X'),
(23, 'LIMBO', 'Uncertain of his sister\'s fate, a boy enters LIMBO.', '2011-08-02', 'Action Adventure Game', 'PC'),
(24, 'Borderlands 2', 'The Ultimate Vault Hunter’s Upgrade lets you get the most out of the Borderlands 2 experience.', '2012-09-21', 'Role Playing Game', 'Xbox Series X'),
(25, 'Fallout 4', 'Bethesda Game Studios, the award-winning creators of Fallout 3 and The Elder Scrolls V: Skyrim, welcome you to the world of Fallout 4 – their most ambitious game ever, and the next generation of open-world gaming.', '2015-11-10', 'Role Playing Game', 'Nintendo Switch'),
(26, 'Sid Meier\'s Civilization V', 'Civilization VI offers new ways to interact with your world, expand your empire across the map, advance your culture, and compete against history’s greatest leaders to build a civilization that will stand the test of time.', '2016-10-21', 'Real-Time Strategy', 'PlayStation 5'),
(27, 'Cyberpunk 2077', 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.', '2020-12-10', 'Real-Time Strategy', 'Nintendo Switch'),
(28, 'Mass Effect Legendary Edition', 'The Mass Effect™ Legendary Edition includes single-player base content and over 40 DLC from the highly acclaimed Mass Effect, Mass Effect 2, and Mass Effect 3 games, including promo weapons, armors, and packs — remastered and optimized for 4K Ultra HD.', '2021-05-14', 'Real-Time Strategy', 'Nintendo Switch'),
(29, 'Company of Heroes 2', 'Experience the ultimate WWII RTS platform with COH2 and its standalone expansions. This package includes the base game, which you can then upgrade by purchasing The Western Front Armies, Ardennes Assault and/or The British Forces.', '2013-06-25', 'Real-Time Strategy', 'PlayStation 5'),
(30, 'PAYDAY 2', 'PAYDAY 2 is an action-packed, four-player co-op shooter that once again lets gamers don the masks of the original PAYDAY crew - Dallas, Hoxton, Wolf and Chains - as they descend on Washington DC for an epic crime spree.', '2013-08-13', 'Action Adventure Game', 'Xbox Series X'),
(31, 'Destiny 2', 'Destiny 2 is an action MMO with a single evolving world that you and your friends can join anytime, anywhere, absolutely free.', '2019-10-01', 'Action Adventure Game', 'Xbox Series X'),
(32, 'Age of Wonders: Planetfall', 'Age of Wonders: Planetfall is the new strategy game bringing all the exciting tactical turn-based combat and in-depth empire building of its predecessors to space in an all-new, sci-fi setting.', '2019-08-06', 'Real-Time Strategy', 'PlayStation 5,PC,Nintendo Switch'),
(33, 'Tropico 6', 'El Presidente is back! Prove yourself once again as a feared dictator or peace-loving statesman on the island state of Tropico and shape the fate of your very own banana republic through four distinctive eras.', '2019-03-29', 'Real-Time Strategy', 'Nintendo Switch'),
(34, 'Fishing Planet', 'A unique and highly realistic online game. Choose your lures, make your trophy catches and sharpen your real angling skills anywhere, anytime with your friends!', '2015-08-11', 'Sports Game', 'PC'),
(35, 'FIFA 17', 'FIFA 17 immerses you in authentic football experiences by leveraging the sophistication of a new game engine, while introducing you to football players full of depth and emotion, and taking you to brand new worlds accessible only in the game. ', '2016-09-27', 'Sports Game', 'Xbox Series X'),
(36, 'Syberia', 'Join Kate Walker as she travels to remote locations and time periods in this timeless voyage to discover her true destiny.', '2002-09-01', 'Puzzle Game', 'PlayStation 5'),
(37, 'Human: Fall Flat', 'Human: Fall Flat is a hilarious, light-hearted platformer set in floating dreamscapes that can be played solo or with up to 8 players online. Free new levels keep its vibrant community rewarded.', '2016-07-22', 'Puzzle Game', 'PlayStation 5'),
(38, 'Middle-earth: Shadow of War', 'Experience an epic open-world brought to life by the award-winning Nemesis System. Forge a new Ring of Power, conquer Fortresses in massive battles and dominate Mordor with your personal orc army in Middle-earth™: Shadow of War™.', '2017-10-10', 'Real-Time Strategy', 'Nintendo Switch'),
(39, 'Bloodborne', 'Throughout the game, you are forced to explore an enormous open world of Yharnam. You meet horrific bosses, explore vast areas, houses and open spaces while continually dodging, attacking and trying not to get killed by a massive number of hostile NPCs.', '2015-03-24', 'Real-Time Strategy', 'Nintendo Switch'),
(40, 'Frostpunk', 'Frostpunk is the first society survival game. As the ruler of the last city on Earth, it is your duty to manage both its citizens and infrastructure. What decisions will you make to ensure your society\'s survival?', '2018-04-24', 'Real-Time Strategy', 'PC'),
(41, 'Drawful 2', 'For 3-8 players and an audience of thousands! Your phones or tablets are your controllers! The game of terrible drawings and hilariously wrong answers.', '2016-06-21', 'Real-Time Strategy', 'PC'),
(42, 'SpaceChem', 'Take on the role of a Reactor Engineer working for SpaceChem, the leading chemical synthesizer for frontier colonies. Construct elaborate factories to transform raw materials into valuable chemical products!', '2011-03-02', 'Puzzle Game', 'Xbox Series X'),
(43, 'FEZ', 'When the existence of a mysterious 3rd dimension is revealed to him, Gomez is sent out on a journey that will take him to the very end of time and space. Use your ability to navigate 3D structures from 4 distinct classic 2D perspectives.', '2013-05-01', 'Puzzle Game', 'Xbox Series X'),
(44, 'BioShock Infinite', 'Indebted to the wrong people, with his life on the line, veteran of the U.S. Cavalry and now hired gun, Booker DeWitt must rescue Elizabeth, a mysterious girl imprisoned since childhood and locked up in the flying city of Columbia.', '2013-03-25', 'Action Adventure Game', 'PlayStation 5'),
(45, 'Left 4 Dead 2', 'This co-operative action horror FPS takes you and your friends through the cities, swamps and cemeteries of the Deep South, from Savannah to New Orleans across five expansive campaigns.', '2009-11-17', 'Action Adventure Game', 'PlayStation 5'),
(46, 'Resident Evil 5', 'This game is a port of the Games for Windows - Live version that was released in 2009. If you buy the Untold Stories Bundle here on Steam, it will be the same as upgrading to Resident Evil 5 Gold Edition.', '2009-09-15', 'Real-Time Strategy', 'PC'),
(47, 'Paladins', 'Join 50+ million players in Paladins, the free-to-play fantasy team-based shooter sensation. Wield guns and magic as a legendary Champion of the Realm, customizing your core set of abilities to play exactly how you want to play.', '2018-05-08', 'Real-Time Strategy', 'PC'),
(48, 'The Swapper', 'What if someone knew your mind better than you did? The Swapper is an award-winning, narrative driven puzzle game set in the furthest reaches of space.', '2013-05-30', 'Puzzle Game', 'Nintendo Switch'),
(49, 'Valiant Hearts: The Great War', 'Valiant Hearts: The Great War is the story of 4 crossed destinies and a broken love in a world torn apart. Lost in the middle of the trenches, play as each of the 4 strangers, relive the War and help a young German soldier find his love.', '2014-06-25', 'Puzzle Game', 'Nintendo Switch'),
(50, 'HITMAN', 'There is a world beyond ours. Beyond nations, justice, ethics. It never sleeps. It exists everywhere. And once you enter....there is no going back. Welcome to the World of Assassination. You are Agent 47, the world\'s ultimate assassin.', '2016-03-11', 'First Person Shooter', 'PC'),
(51, 'It\'s a game', 'You don\'t know why you play it. That\'s the puzzle.', '2021-11-18', 'Puzzle Game', 'PlayStation 5,PC'),
(52, 'Crusader Kings 3', 'Crusader Kings III is the heir to a long legacy of historical grand strategy experiences and arrives with a host of new ways to ensure the success of your royal house.', '2020-09-01', 'Real-Time Strategy', 'PC'),
(54, 'gun fest 3k', 'it\'s a gun fest', '2021-11-17', 'Puzzle Game', 'PlayStation 5,PC'),
(55, 'gun fest 3k', 'it\'s a puzzle game alright', '2021-11-02', 'Puzzle Game', 'Xbox Series X,Nintendo Switch'),
(57, 'testy', 'Testy McTest', '2021-11-08', 'Multiplayer Online Battle-Arena', 'PlayStation 5,PC,Nintendo Switch');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `score` int(1) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `game_id`, `user_id`, `title`, `description`, `score`, `created_at`) VALUES
(1, 9, 7, 'Snooze-fest', 'Plipp', 3, '2021-11-20 12:55:26'),
(2, 8, 8, 'Badass futurism', 'So many sky scrapers!', 4, '2021-11-20 12:55:26'),
(3, 8, 9, 'Lazer guns go zoop', 'Wow!', 5, '2021-11-20 12:55:26'),
(4, 1, 1, 'good', 'i can shoot guns Yahooo!!!', 3, '2021-11-20 13:18:29'),
(5, 5, 1, 'Cool game ', 'i can kill dragons', 5, '2021-11-20 13:33:21'),
(6, 1, 1, 'guns', 'guns, guns GUUUUUUNNNNNNSSSSS!!!!!!!!', 5, '2021-11-20 14:37:38'),
(8, 15, 1, 'Decent', 'It\'s alright.', 0, '2021-11-20 15:50:08'),
(9, 16, 1, 'Very cool', 'I recommend. Tanks are the coolest. Very cool. ', 5, '2021-11-20 15:52:12'),
(11, 18, 1, 'WoooWHE!', 'Even better than DiRT. Hours of fun!', 5, '2021-11-20 15:54:59'),
(12, 20, 1, 'Not a fan', 'Very overrated, I would rather play DiRT.', 2, '2021-11-20 15:55:48'),
(13, 21, 1, 'Noice', 'Despite its name, Wreckfest is filled with unparalleled beauty. The cars remind me of the good old days, sunshine and rainbows. 10/10 it cured my depression.', 5, '2021-11-20 15:57:39'),
(14, 22, 1, 'Very relatable', 'Everyone needs to play this game, it changed my life.', 5, '2021-11-20 16:00:18'),
(15, 23, 1, 'Beautiful', 'This is a beautiful black and white game, very creative and in the beginning I found it quite engaging. Unfortunately I lost interest after a few courses.', 4, '2021-11-20 16:01:58'),
(16, 24, 1, 'No no NO!!!', 'Why does everyone like that stupid robot. He acts like a know it all, and I do not care for it. AVOID THIS GAME AT ALL COSTS!!', 1, '2021-11-20 16:03:18'),
(17, 25, 1, 'fall the fudge away from me', 'y would anyone play dis game, lol. ', 2, '2021-11-20 16:04:52'),
(18, 26, 1, 'Very cool', 'I love crushing my friends\' hopes and dreams by extinguishing their carefully crafted civilizations. ', 5, '2021-11-20 16:08:39'),
(19, 27, 1, 'controversial but...', '... where is the punk and where is the cyber??? Trash.', 2, '2021-11-20 16:09:32'),
(20, 28, 1, 'Legendary indeed', 'Must have for Mass Effect fans. It is glorious. ', 5, '2021-11-20 16:10:42'),
(21, 29, 1, 'Not bad', 'I wasn\'t expecting much when I bought this game, but my doubts were put to shame instanly. It is creative, fun, unique, and cool.', 4, '2021-11-20 16:13:38'),
(22, 30, 1, 'Hell yeah', 'I\'ve been waiting for this game for so long, and it did not disappoint! Let\'s go!! Endless hours of fun. ', 5, '2021-11-20 16:14:40'),
(23, 31, 1, 'Free, but at what cost..?', 'This is a horrific game. It says it\'s free, but honestly, I\'d have to get paid to ever play it again. My time is worth more than this. Absolute garbage. ', 1, '2021-11-20 16:17:17'),
(24, 32, 1, 'Decent enough', 'I was expecting a bit more from this game, the characters were a bit lacking, and it made me lose interest. Beautifully made though. ', 3, '2021-11-20 16:19:46'),
(25, 33, 1, 'my frien say this is niice', 'they say i make good dictator, not so m\\fun be nice, but i make all decisions on my TROPICO!! 6 ', 4, '2021-11-20 16:22:18'),
(26, 34, 1, 'Thank god for Fishing Planet', 'This game saved my marriage. I love fishing, but my wife is vegan and does not like fishing. Now I can fish at home with my wife, and no real fish harmed. ', 5, '2021-11-20 16:24:51'),
(27, 35, 1, 'very good', 'FIFA 17 is underrated. Much better than 16, but better than 19 also. Not as good as 18, but slightly better than 20. ', 4, '2021-11-20 16:27:04'),
(28, 36, 1, 'I like', 'I like puzzles, I do not like Kate Walker. very smug. More puzzles, less Kate next time.', 2, '2021-11-20 16:30:07'),
(29, 37, 1, 'Very good party game', 'Not as fun to play solo, but very entertaining with friends. You should try it. ', 3, '2021-11-20 16:33:56'),
(30, 38, 1, 'WHy', 'Why was this made? I don\'t understand why anyone would do this. Won\'t someone please think of the children? This should be removed from the website. DELETE. Horrible game. Watch the movies instead. ', 1, '2021-11-20 16:35:57'),
(31, 39, 1, 'I don\'t suppord this', 'I am a literal vampire and this offends me. ', 2, '2021-11-20 16:39:19'),
(32, 40, 1, 'More punk than cyberpunk', 'I\'m huge fan of this game, and I recommend that everyone disappointed in Cyberpunk, gives this game a go instead. It might change your life. ', 5, '2021-11-20 16:43:47'),
(33, 41, 1, 'Party game', 'Genuinely fun party game, with slight improvements from its predecessor, such as an extra colour to choose from. ', 5, '2021-11-20 16:44:59'),
(34, 42, 1, 'chem', 'It\'s brain-melting pseudo chemistry, highly recommend it if you want your brain to become soup (you also get a free TF2 item which is neat?)', 5, '2021-11-20 16:48:26'),
(35, 1, 1, 'Excellent', 'Love this game', 5, '2021-11-20 16:52:42'),
(36, 43, 1, 'Meh', 'I did NOT enjoy the total lack of direction, the endless backtracking, the confusing world map and the dramatic difficulty curve associated with the esoteric, crytpographic puzzles.', 2, '2021-11-20 16:52:58'),
(37, 2, 1, 'Zombie Army', 'A bit challenging, not for newbies. Love the graphics!', 4, '2021-11-20 16:53:58'),
(38, 2, 1, 'Love this!!!', 'Been hooked since I started playing this game a few weeks ago :D', 5, '2021-11-20 16:58:31'),
(39, 2, 1, 'Luwz it', '.', 5, '2021-11-20 16:58:50'),
(40, 51, 1, 'Cool game', 'i like like very muchy :* <3', 4, '2021-11-20 17:00:28'),
(41, 4, 1, 'Baseball fan', 'This is a nice game ', 3, '2021-11-20 17:02:18'),
(42, 8, 1, 'Waste of money', 'Didn\'t work', 1, '2021-11-20 17:18:19'),
(43, 5, 1, 'My favorite', 'Loved this game since the first release', 5, '2021-11-20 17:19:50'),
(44, 42, 1, 'Chemical lab for everyone!!', 'This is great practice', 4, '2021-11-20 17:23:09'),
(45, 24, 1, 'Borderland fave', 'This is a good game, highly recommend', 4, '2021-11-20 17:23:52'),
(46, 40, 1, '...', 'Was recommended this game and in fact I like it', 3, '2021-11-20 17:24:49'),
(47, 47, 1, 'Paladins is great', 'Got this for my birthday and been playing every day since. Good graphics and enjoyable story line.', 5, '2021-11-20 17:25:38'),
(48, 50, 1, 'Cool story line', 'Ever thought  about becoming a hitman? Would not recommend but definetly recommending this game as a sustitute', 4, '2021-11-20 17:26:25'),
(49, 48, 1, 'Mindfucking', 'This is some really bizarre shit', 3, '2021-11-20 17:27:23'),
(50, 48, 1, 'Cool', 'Like this game. Very different from other games I\'ve played before.', 4, '2021-11-20 17:27:55'),
(51, 45, 1, 'Horrifying', 'Beware. This is really scary so would not recommend for children', 3, '2021-11-20 17:28:49'),
(52, 45, 1, 'Just no', 'Didn\'t like', 1, '2021-11-20 17:29:32'),
(53, 45, 1, 'Cool', '.', 3, '2021-11-20 17:29:57'),
(54, 44, 1, 'Wargame', 'Kinda like it. Good graphics.', 4, '2021-11-20 17:30:36'),
(55, 44, 1, 'Poor story line', 'Would not recommend...', 2, '2021-11-20 17:31:01'),
(56, 44, 1, 'Hola', 'Looove this game. ', 5, '2021-11-20 17:31:23'),
(57, 30, 1, 'This is good', 'Was so looking forward to this game. Been playing all day.', 5, '2021-11-20 17:32:43'),
(58, 6, 1, 'Good ', 'This is a good game.', 3, '2021-11-20 17:42:27'),
(59, 6, 1, 'Ok +', 'Okay but nothing special.', 3, '2021-11-20 17:43:00'),
(60, 6, 1, 'Favorite', 'Love love love this game. I\'m gonna give this to my friends as a birthday present as well!', 5, '2021-11-20 17:43:36'),
(61, 8, 1, 'Should be multiplayer', 'Wish more people could play this at the same time but good game', 4, '2021-11-20 17:45:37'),
(62, 52, 1, 'Meh game', 'Played 525 hours, not worth it.....\n\nNOT WORTH IT!!\n\nNot WORTH it i SAID!!\n\n>:(', 2, '2021-11-20 17:49:30'),
(63, 51, 1, 'sfgsdgfs', 'sdfsdfsf', 3, '2021-11-20 17:57:02'),
(65, 47, 1, 'Okay', 'This is a decent game.', 3, '2021-11-20 18:36:42'),
(68, 19, 1, 'Ok', 'i am always bottom fargh', 2, '2021-11-20 23:26:21'),
(71, 1, 1, 'I really like the star ratings!', 'This is great, i really love it!!!', 4, '2021-11-21 04:09:24'),
(73, 23, 1, 'Cool', 'Love it', 5, '2021-11-21 15:25:00'),
(74, 3, 1, 'Fat fail', 'Hated it', 1, '2021-11-21 15:25:03'),
(75, 3, 1, 'Sad', 'Sad sad game', 1, '2021-11-21 15:25:27'),
(76, 23, 1, 'Trash', 'Stupid', 1, '2021-11-21 15:25:33'),
(77, 3, 1, 'Buu', 'Was looking forward to this', 1, '2021-11-21 15:25:46'),
(79, 32, 1, 'meh', 'NOT OK', 1, '2021-11-21 16:41:28'),
(84, 16, 1, 'So Good', 'I like this a lot.', 5, '2021-11-21 16:49:00'),
(86, 57, 1, 'Testy', 'McTest', 3, '2021-11-21 17:07:22'),
(87, 57, 1, 'Testyu', 'TestyMcTest', 1, '2021-11-21 17:07:37');

-- --------------------------------------------------------

--
-- Table structure for table `review_evaluations`
--

CREATE TABLE `review_evaluations` (
  `id` int(11) NOT NULL,
  `review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `review_evaluations`
--

INSERT INTO `review_evaluations` (`id`, `review_id`, `user_id`) VALUES
(11, 11, 1),
(21, 4, 1),
(22, 71, 1),
(25, 59, 1),
(28, 10, 1),
(31, 9, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nickname`, `created_at`) VALUES
(1, 'idiot', '2021-11-16 22:38:15'),
(2, 'tullingen', '2021-11-16 22:39:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_spill_id` (`game_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `review_evaluations`
--
ALTER TABLE `review_evaluations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `review_id` (`review_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `review_evaluations`
--
ALTER TABLE `review_evaluations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
