USE [Ecommerce]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ProductQuantity]') AND type in (N'U'))
ALTER TABLE [dbo].[ProductQuantity] DROP CONSTRAINT IF EXISTS [FK_SizeMapping_Size]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ProductQuantity]') AND type in (N'U'))
ALTER TABLE [dbo].[ProductQuantity] DROP CONSTRAINT IF EXISTS [FK_SizeMapping_Product]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Product]') AND type in (N'U'))
ALTER TABLE [dbo].[Product] DROP CONSTRAINT IF EXISTS [FK_Product_IndividualCategory]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Product]') AND type in (N'U'))
ALTER TABLE [dbo].[Product] DROP CONSTRAINT IF EXISTS [FK_Product_Category]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Product]') AND type in (N'U'))
ALTER TABLE [dbo].[Product] DROP CONSTRAINT IF EXISTS [FK_Product_Brand]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Order]') AND type in (N'U'))
ALTER TABLE [dbo].[Order] DROP CONSTRAINT IF EXISTS [FK_Order_Product]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IndividualCategorySizeMapping]') AND type in (N'U'))
ALTER TABLE [dbo].[IndividualCategorySizeMapping] DROP CONSTRAINT IF EXISTS [FK_IndividualCategorySizeMapping_Size]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IndividualCategorySizeMapping]') AND type in (N'U'))
ALTER TABLE [dbo].[IndividualCategorySizeMapping] DROP CONSTRAINT IF EXISTS [FK_IndividualCategorySizeMapping_IndividualCategory]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CategoryMapping]') AND type in (N'U'))
ALTER TABLE [dbo].[CategoryMapping] DROP CONSTRAINT IF EXISTS [FK_CategoryMapping_IndividualCategory]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CategoryMapping]') AND type in (N'U'))
ALTER TABLE [dbo].[CategoryMapping] DROP CONSTRAINT IF EXISTS [FK_CategoryMapping_Category]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Cart]') AND type in (N'U'))
ALTER TABLE [dbo].[Cart] DROP CONSTRAINT IF EXISTS [FK_Cart_Product]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Product]') AND type in (N'U'))
ALTER TABLE [dbo].[Product] DROP CONSTRAINT IF EXISTS [DF_Product_Quantity]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Product]') AND type in (N'U'))
ALTER TABLE [dbo].[Product] DROP CONSTRAINT IF EXISTS [DF_Product_Reviews]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Product]') AND type in (N'U'))
ALTER TABLE [dbo].[Product] DROP CONSTRAINT IF EXISTS [DF_Product_Rating]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Favourite]') AND type in (N'U'))
ALTER TABLE [dbo].[Favourite] DROP CONSTRAINT IF EXISTS [DF_Favourite_AddedOn]
GO
/****** Object:  Table [dbo].[UserProductFilter]    Script Date: 18-04-2023 12:30:29 ******/
DROP TABLE IF EXISTS [dbo].[UserProductFilter]
GO
/****** Object:  Table [dbo].[Size]    Script Date: 18-04-2023 12:30:29 ******/
DROP TABLE IF EXISTS [dbo].[Size]
GO
/****** Object:  Table [dbo].[ProductQuantity]    Script Date: 18-04-2023 12:30:29 ******/
DROP TABLE IF EXISTS [dbo].[ProductQuantity]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 18-04-2023 12:30:29 ******/
DROP TABLE IF EXISTS [dbo].[Product]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 18-04-2023 12:30:29 ******/
DROP TABLE IF EXISTS [dbo].[Order]
GO
/****** Object:  Table [dbo].[IndividualCategorySizeMapping]    Script Date: 18-04-2023 12:30:29 ******/
DROP TABLE IF EXISTS [dbo].[IndividualCategorySizeMapping]
GO
/****** Object:  Table [dbo].[IndividualCategory]    Script Date: 18-04-2023 12:30:29 ******/
DROP TABLE IF EXISTS [dbo].[IndividualCategory]
GO
/****** Object:  Table [dbo].[Favourite]    Script Date: 18-04-2023 12:30:29 ******/
DROP TABLE IF EXISTS [dbo].[Favourite]
GO
/****** Object:  Table [dbo].[CategoryMapping]    Script Date: 18-04-2023 12:30:29 ******/
DROP TABLE IF EXISTS [dbo].[CategoryMapping]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 18-04-2023 12:30:29 ******/
DROP TABLE IF EXISTS [dbo].[Category]
GO
/****** Object:  Table [dbo].[Cart]    Script Date: 18-04-2023 12:30:29 ******/
DROP TABLE IF EXISTS [dbo].[Cart]
GO
/****** Object:  Table [dbo].[Brand]    Script Date: 18-04-2023 12:30:29 ******/
DROP TABLE IF EXISTS [dbo].[Brand]
GO
/****** Object:  Table [dbo].[Brand]    Script Date: 18-04-2023 12:30:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brand](
	[BrandId] [int] IDENTITY(1,1) NOT NULL,
	[BrandName] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Brand] PRIMARY KEY CLUSTERED 
(
	[BrandId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cart]    Script Date: 18-04-2023 12:30:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cart](
	[CartItemId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[ProductId] [int] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_Cart_1] PRIMARY KEY CLUSTERED 
(
	[CartItemId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 18-04-2023 12:30:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CategoryMapping]    Script Date: 18-04-2023 12:30:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CategoryMapping](
	[CategoryMappingId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryId] [int] NOT NULL,
	[IndividualCategoryId] [int] NOT NULL,
 CONSTRAINT [PK_CategoryMapping] PRIMARY KEY CLUSTERED 
(
	[CategoryMappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Favourite]    Script Date: 18-04-2023 12:30:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Favourite](
	[FavouriteId] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[AddedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_Favourite] PRIMARY KEY CLUSTERED 
(
	[FavouriteId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IndividualCategory]    Script Date: 18-04-2023 12:30:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IndividualCategory](
	[IndividualCategoryId] [int] IDENTITY(1,1) NOT NULL,
	[IndividualCategoryName] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_IndividualCategory] PRIMARY KEY CLUSTERED 
(
	[IndividualCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IndividualCategorySizeMapping]    Script Date: 18-04-2023 12:30:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IndividualCategorySizeMapping](
	[IndividualCategorySizeMappingId] [int] IDENTITY(1,1) NOT NULL,
	[IndividualCategoryId] [int] NOT NULL,
	[SizeId] [int] NOT NULL,
 CONSTRAINT [PK_IndividualCategorySizeMapping] PRIMARY KEY CLUSTERED 
(
	[IndividualCategorySizeMappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 18-04-2023 12:30:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[OrderId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[ProductId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[PlacedOn] [datetime] NOT NULL,
	[OrderInstanceId] [int] NOT NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 18-04-2023 12:30:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[ProductId] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](1000) NOT NULL,
	[BrandId] [int] NOT NULL,
	[CategoryId] [int] NOT NULL,
	[IndividualCategoryId] [int] NOT NULL,
	[OriginalPrice] [int] NOT NULL,
	[FinalPrice] [int] NULL,
	[Rating] [float] NOT NULL,
	[Reviews] [int] NOT NULL,
	[Url] [nvarchar](1000) NULL,
	[Photo] [varbinary](max) NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductQuantity]    Script Date: 18-04-2023 12:30:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductQuantity](
	[ProductQuantityId] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NOT NULL,
	[SizeId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_SizeMapping] PRIMARY KEY CLUSTERED 
(
	[ProductQuantityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Size]    Script Date: 18-04-2023 12:30:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Size](
	[SizeId] [int] IDENTITY(1,1) NOT NULL,
	[SizeName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Size] PRIMARY KEY CLUSTERED 
(
	[SizeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserProductFilter]    Script Date: 18-04-2023 12:30:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserProductFilter](
	[UserProductFilterId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Brands] [nvarchar](max) NOT NULL,
	[Categories] [nvarchar](max) NOT NULL,
	[IndividualCategories] [nvarchar](max) NOT NULL,
	[PriceRanges] [nvarchar](max) NOT NULL,
	[ProductCount] [int] NOT NULL,
	[SortBy] [nvarchar](50) NOT NULL,
	[SortOrder] [nvarchar](50) NOT NULL,
	[PageNumber] [int] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_UserProductFilter] PRIMARY KEY CLUSTERED 
(
	[UserProductFilterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Brand] ON 
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (1, N'2GO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (2, N'39 THREADS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (3, N'3PIN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (4, N'513')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (5, N'5TH ANFOLD')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (6, N'883 Police')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (7, N'98 Degree North')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (8, N'Abhishti')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (9, N'abof')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (10, N'ACTIMAXX')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (11, N'ACTOHOLIC')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (12, N'AD & AV')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (13, N'AD By Arvind')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (14, N'ADBUCKS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (15, N'ADIDAS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (16, N'ADIDAS Originals')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (17, N'Admiral')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (18, N'Adobe')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (19, N'Aeropostale')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (20, N'Aesthetic Bodies')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (21, N'AESTHETIC NATION')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (22, N'AGIL ARMERO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (23, N'ahhaaaa')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (24, N'Aj DEZInES')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (25, N'Ajile by Pantaloons')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (26, N'Alan Jones')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (27, N'Alcis')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (28, N'aLL')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (29, N'Allen Cooper')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (30, N'Allen Solly')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (31, N'Allen Solly Sport')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (32, N'Allen Solly Tribe')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (33, N'Almo Wear')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (34, N'Alvaro Castagnino')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (35, N'American Archer')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (36, N'American Bull')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (37, N'American Crew')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (38, N'American Crew Plus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (39, N'AMERICAN EAGLE OUTFITTERS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (40, N'American Swan')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (41, N'American-Elm')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (42, N'amzira')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (43, N'Anouk')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (44, N'Antony Morato')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (45, N'Anug by SOJANYA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (46, N'appulse')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (47, N'Aptonia By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (48, N'Arctic Fox')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (49, N'ARDEUR')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (50, N'ARISE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (51, N'Armaan Ethnic')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (52, N'ARMISTO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (53, N'armure')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (54, N'Arrow')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (55, N'Arrow Blue Jean Co.')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (56, N'Arrow New York')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (57, N'Arrow Sport')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (58, N'Arsenal FC')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (59, N'Artengo By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (60, N'ASICS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (61, N'ASICS Tiger')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (62, N'Athleto')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (63, N'ATHLISIS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (64, N'ATTIITUDE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (65, N'Aura')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (66, N'AUSTIEX')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (67, N'Austin wood')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (68, N'AUSTIVO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (69, N'Aventura Outfitters')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (70, N'AVI Living')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (71, N'AVOLT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (72, N'Ayaki')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (73, N'azania')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (74, N'Baawara By Bhama')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (75, N'Badoliya & Sons')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (76, N'Balenzia')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (77, N'Balista')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (78, N'BAMBOS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (79, N'Bareblow')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (80, N'Basics')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (81, N'BASIICS by La Intimo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (82, N'BE AWARA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (83, N'BEAT LONDON by PEPE JEANS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (84, N'Beau Design')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (85, N'bedgasm')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (86, N'beevee')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (87, N'Being Fab')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (88, N'Being Human')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (89, N'Belliskey')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (90, N'BEN SHERMAN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (91, N'Bene Kleed')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (92, N'Bene Kleed Plus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (93, N'Benstoke')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (94, N'berry blues')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (95, N'berrytree')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (96, N'Besiva')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (97, N'Beverly Hills Polo Club')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (98, N'Bewakoof')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (99, N'Bewakoof Plus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (100, N'Bharatasya')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (101, N'Big Fox')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (102, N'bigbanana')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (103, N'Bishop Cotton')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (104, N'Bitterlime')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (105, N'Bitz')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (106, N'Black coffee')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (107, N'Black Panther')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (108, N'BLACK RADIO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (109, N'Blackberrys')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (110, N'Blacksmith')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (111, N'Blazer Quarter')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (112, N'BLITZSOX')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (113, N'Blue Saint')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (114, N'BODYACTIVE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (115, N'Bodycare')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (116, N'BODYCARE INSIDER')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (117, N'BODYX')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (118, N'Bonjour')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (119, N'BonOrganik')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (120, N'Bossini')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (121, N'Boston Club')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (122, N'BRACLO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (123, N'BRATMA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (124, N'Braveo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (125, N'Breakbounce')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (126, N'British Club')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (127, N'BROADSTAR')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (128, N'Bruun & Stengade')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (129, N'Btwin By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (130, N'BUCIK')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (131, N'BuckleUp')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (132, N'BUKKUM')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (133, N'BULLMER')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (134, N'bummer')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (135, N'Bunnywave')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (136, N'Burnt Umber')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (137, N'Bushirt')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (138, N'BYFORD by Pantaloons')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (139, N'C9 AIRWEAR')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (140, N'Callino London')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (141, N'Calvin Klein Jeans')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (142, N'Calvin Klein Underwear')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (143, N'Camey')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (144, N'CAMLA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (145, N'Campus Sutra')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (146, N'Canary London')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (147, N'CANOE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (148, N'Cantabil')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (149, N'Canterbury')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (150, N'cape canary')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (151, N'CASA DE NEE NEE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (152, N'CAVALLO by Linen Club')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (153, N'Cayman')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (154, N'Celio')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (155, N'CENWELL')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (156, N'Champion')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (157, N'Chennis')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (158, N'Cherokee')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (159, N'CHILL WINSTON')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (160, N'Chitwan Mohan')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (161, N'Chkokko')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (162, N'Chromozome')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (163, N'CINOCCI')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (164, N'CL SPORT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (165, N'Classic Polo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (166, N'Cloak & Decker')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (167, N'Cloak & Decker by Monte Carlo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (168, N'Club York')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (169, N'COBB')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (170, N'Code 61')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (171, N'CODE by Lifestyle')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (172, N'ColorPlus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (173, N'Colt')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (174, N'Columbia')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (175, N'COLVYNHARRIS JEANS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (176, N'Conditions Apply')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (177, N'Copperline')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (178, N'COTTON ON')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (179, N'COUPER & COLL')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (180, N'Creature')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (181, N'Creeva')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (182, N'Crimsoune Club')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (183, N'Crocodile')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (184, N'Cross Court')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (185, N'CROYDON')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (186, N'CRUSSET')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (187, N'CUKOO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (188, N'Cultsport')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (189, N'D Kumar')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (190, N'Dais')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (191, N'DAMENSCH')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (192, N'DC by Kook N Keech')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (193, N'DC Comics')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (194, N'DECOREALM')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (195, N'DeFacto')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (196, N'Denimize by Fame Forever')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (197, N'Denizen From Levis')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (198, N'Dennis Lingo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (199, N'Dennis Morton')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (200, N'DENNISON')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (201, N'DEVOILER')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (202, N'Dexter by Kook N Keech')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (203, N'DEYANN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (204, N'DEYANN PLUS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (205, N'Difference of Opinion')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (206, N'DILLINGER')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (207, N'Disney by Wear Your Mind')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (208, N'Disrupt')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (209, N'DIXCY SCOTT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (210, N'DIXCY SCOTT MAXIMUS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (211, N'DKGF FASHION')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (212, N'Dollar')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (213, N'Dollar Bigboss')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (214, N'Dollar Socks')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (215, N'Dollar Ultra')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (216, N'Domyos By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (217, N'DON VINO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (218, N'Donald Duck')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (219, N'Donzell')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (220, N'DOOR74')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (221, N'Double Two')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (222, N'Dream of Glory Inc')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (223, N'DS WORLD')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (224, N'Ducati')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (225, N'Duke')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (226, N'Dupatta Bazaar')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (227, N'DYCA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (228, N'Dynamocks')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (229, N'East Ink')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (230, N'Ecentric')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (231, N'Ed Hardy')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (232, N'EDRIO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (233, N'effy')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (234, N'EL REGALO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (235, N'ELABORADO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (236, N'ELEGANCE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (237, N'ELEVANTO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (238, N'Emerals')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (239, N'Enchanted Drapes')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (240, N'Enciger')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (241, N'English Navy')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (242, N'Ennoble')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (243, N'EPPE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (244, N'ESPRIT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (245, N'ETC')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (246, N'ether')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (247, N'Ethnicity')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (248, N'ethnix')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (249, N'Ethnix by Raymond')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (250, N'EthnoVogue')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (251, N'EVADICT By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (252, N'even')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (253, N'EVERBLUE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (254, N'EVOQ')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (255, N'Excalibur')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (256, N'Fabindia')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (257, N'FABNEST')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (258, N'FabSeasons')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (259, N'Fame Forever by Lifestyle')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (260, N'FAVOROSKI')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (261, N'FC Barcelona')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (262, N'FCUK')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (263, N'FCUK Underwear')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (264, N'FERANOID')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (265, N'FEVER')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (266, N'FFLIRTYGO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (267, N'FIDO DIDO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (268, N'FIFA U-17 WC')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (269, N'FILA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (270, N'FINNOY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (271, N'Firangi Yarn')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (272, N'FirstKrush')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (273, N'FITINC')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (274, N'Fitkin')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (275, N'FITUP LIFE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (276, N'FiTZ')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (277, N'FLAMBOYANT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (278, N'FLAWLESS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (279, N'Fleximaa')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (280, N'Fluffalump')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (281, N'FLX By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (282, N'Flying Machine')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (283, N'FOGA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (284, N'Forca')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (285, N'Forca by Lifestyle')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (286, N'Force NXT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (287, N'FORCLAZ By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (288, N'Foreign Culture By Fort Collins')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (289, N'FOREVER 21')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (290, N'Fort Collins')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (291, N'FOUGANZA By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (292, N'Four One Oh')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (293, N'Fox')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (294, N'Franco Leone')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (295, N'FREAKINS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (296, N'Free Authority')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (297, N'FREECULTR')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (298, N'Freehand')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (299, N'FREESOUL')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (300, N'French Connection')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (301, N'FRENCH FLEXIOUS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (302, N'FRESH FEET')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (303, N'Friskers')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (304, N'Fruit of the loom')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (305, N'FUAARK')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (306, N'FUGAZEE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (307, N'Fully Filmy')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (308, N'FURO by Red Chief')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (309, N'FurryFlair')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (310, N'Gallus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (311, N'GANT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (312, N'GAS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (313, N'Genius18')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (314, N'Genx')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (315, N'Geonaute By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (316, N'GESPO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (317, N'GIORDANO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (318, N'Glemora')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (319, N'Globus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (320, N'GOLDSTROMS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (321, N'GoStyle')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (322, N'GRACIT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (323, N'Greenfibre')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (324, N'GRIFFEL')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (325, N'GRITSTONES')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (326, N'GUESS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (327, N'GullyActive')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (328, N'H&M')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (329, N'Hancock')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (330, N'Hangup')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (331, N'hangup plus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (332, N'hangup trend')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (333, N'Happy Socks')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (334, N'HARBORNBAY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (335, N'HARSAM')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (336, N'Harvard')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (337, N'Hatheli')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (338, N'Head')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (339, N'Heelium')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (340, N'HERE&NOW')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (341, N'hexafun')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (342, N'High Star')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (343, N'HIGHLANDER')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (344, N'HOB')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (345, N'HOLDIT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (346, N'Home Centre')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (347, N'Horsefly')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (348, N'House of Pataudi')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (349, N'HPS Sports')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (350, N'HRX')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (351, N'HRX by Hrithik Roshan')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (352, N'Hubberholme')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (353, N'Huetrap')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (354, N'Huggun')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (355, N'hummel')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (356, N'Hush Puppies')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (357, N'Hypernation')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (358, N'I Am Animal')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (359, N'I Know')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (360, N'IC4')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (361, N'IMPACKT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (362, N'IMT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (363, N'IMYOUNG')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (364, N'INDIAN EPIC')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (365, N'Indian Poshakh')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (366, N'Indian Terrain')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (367, N'INDIAN WOOTZ')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (368, N'Indo Era')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (369, N'indus route by Pantaloons')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (370, N'Inesis By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (371, N'Instafab Plus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (372, N'INVICTUS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (373, N'Invictus Indoor')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (374, N'Invincible')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (375, N'iO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (376, N'IVOC')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (377, N'IVOC Plus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (378, N'IX IMPRESSION')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (379, N'IZOD')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (380, N'J Hampstead')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (381, N'Jack & Jones')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (382, N'JACKDANZA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (383, N'JADE BLUE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (384, N'JAINISH')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (385, N'Janasya')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (386, N'Jansons')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (387, N'JAPS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (388, N'Jashvi Creation')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (389, N'JB STUDIO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (390, N'JDC')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (391, N'Jean Cafe')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (392, N'JJAAGG T')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (393, N'Jockey')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (394, N'JoE Hazel')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (395, N'John Players')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (396, N'John Pride')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (397, N'Jolie robe')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (398, N'Jompers')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (399, N'Joven')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (400, N'JUMP USA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (401, N'JUNK de LUXE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (402, N'Justanned')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (403, N'Justice League')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (404, N'Juventus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (405, N'Kaifoo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (406, N'KAJARU')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (407, N'Kalenji By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (408, N'Kalt')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (409, N'Kanvin')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (410, N'Kappa')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (411, N'KATSO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (412, N'KAVYA SAREES')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (413, N'Kawach')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (414, N'Kenneth Cole')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (415, N'KETCH')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (416, N'KHADIO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (417, N'Khoday Williams')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (418, N'Killer')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (419, N'KINGDOM OF WHITE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (420, N'KIPRUN By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (421, N'Kipsta By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (422, N'KISAH')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (423, N'KISAH PLUS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (424, N'KLOTTHE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (425, N'Kolor Fusion')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (426, N'Kook N Keech')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (427, N'Kook N Keech Batman')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (428, N'Kook N Keech Disney')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (429, N'Kook N Keech Emoji')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (430, N'Kook N Keech Harry Potter')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (431, N'Kook N Keech Looney Tunes')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (432, N'Kook N Keech Marvel')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (433, N'Kook N Keech Star Wars')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (434, N'Kook N Keech Superman')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (435, N'Kook N Keech Toons')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (436, N'KOPNHAGN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (437, N'Kosha')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (438, N'Koton')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (439, N'Kotty')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (440, N'KRA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (441, N'KRAFT INDIA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (442, N'KROSSSTITCH')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (443, N'Kryptic')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (444, N'KULTPRIT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (445, N'Kuons Avenue')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (446, N'La Intimo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (447, N'LA LOFT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (448, N'La Mode')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (449, N'LacyLook')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (450, N'LAGAAV')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (451, N'LAMAAYA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (452, N'Latest Chikan Garments')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (453, N'LAVOS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (454, N'Lawman pg3')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (455, N'LE BOURGEOIS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (456, N'Leather Retail')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (457, N'Lee')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (458, N'Lee Cooper')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (459, N'Levis')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (460, N'LINDBERGH')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (461, N'Linen Club')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (462, N'Li-Ning')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (463, N'Lino Perros')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (464, N'Llak Jeans')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (465, N'LOCOMOTIVE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (466, N'Lombard')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (467, N'Lotto')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (468, N'Louis Philippe')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (469, N'Louis Philippe Ath.Work')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (470, N'Louis Philippe ATHPLAY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (471, N'Louis Philippe Jeans')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (472, N'Louis Philippe Sport')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (473, N'LOUIS STITCH')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (474, N'Lux Cozi')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (475, N'LUX MAESTRO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (476, N'Luxrio')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (477, N'LUXURAZI')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (478, N'Luxure by Louis Philippe')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (479, N'M&H Easy')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (480, N'M&H Our Water')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (481, N'Maanja')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (482, N'Macroman M-Series')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (483, N'MADSTO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (484, N'MAG')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (485, N'Man Matters')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (486, N'MANAMAGAN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (487, N'MANGO MAN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (488, N'Maniac')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (489, N'Manish Creations')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (490, N'MANQ')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (491, N'ManQ CASUAL')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (492, N'MANQ Plus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (493, N'Manthan')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (494, N'Manu')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (495, N'Manyavar')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (496, N'MARC')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (497, N'Mark Leute')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (498, N'Marks & Spencer')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (499, N'Marvel Avengers')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (500, N'Marvel by Wear Your Mind')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (501, N'Masaba')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (502, N'Masch Sports')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (503, N'MASCLN SASSAFRAS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (504, N'Masculino Latino')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (505, N'Masculino Latino Plus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (506, N'MASH UNLIMITED')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (507, N'Mast & Harbour')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (508, N'Matinique')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (509, N'max')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (510, N'MAXENCE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (511, N'Melange by Lifestyle')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (512, N'Melangebox')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (513, N'MERCHANT MARINE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (514, N'MERLOT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (515, N'METAL')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (516, N'Metersbonwe')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (517, N'Metronaut')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (518, N'METTLE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (519, N'MEWAR')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (520, N'mezmoda')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (521, N'MILLENNIAL MEN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (522, N'Minions by Kook N Keech')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (523, N'Mint & Oak')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (524, N'MKH')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (525, N'Moda Rapido')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (526, N'mode de base')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (527, N'Mode Vetements')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (528, N'MODI JACKET')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (529, N'Modi Kurta')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (530, N'MOHANLAL SONS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (531, N'Mojama')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (532, N'Molly & Michel')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (533, N'MONOCHROME')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (534, N'Monte Carlo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (535, N'MotoGP')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (536, N'MPL SPORTS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (537, N'Mr Bowerbird')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (538, N'MR BUTTON')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (539, N'Mr. Button')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (540, N'MR.KAMEEJ')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (541, N'Mufti')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (542, N'Mumbai Indians')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (543, N'MUTAQINOTI')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (544, N'N Dot')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (545, N'N2S NEXT2SKIN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (546, N'Nabaiji By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (547, N'Nakshi')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (548, N'NAMASKAR')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (549, N'Nation Polo Club')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (550, N'Nature Casuals')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (551, N'Nautica')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (552, N'NAVYSPORT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (553, N'NBA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (554, N'NEUDIS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (555, N'NEVA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (556, N'New Balance')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (557, N'Newfeel By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (558, N'Newport')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (559, N'next')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (560, N'Next Look')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (561, N'Nick&Jess')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (562, N'Nike')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (563, N'Nimayaa')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (564, N'Nite Flite')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (565, N'Not Just Pyjamas')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (566, N'Numero Uno')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (567, N'NYAMBA By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (568, N'Obaan')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (569, N'OBOW')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (570, N'Octave')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (571, N'Ode by House of Pataudi')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (572, N'OFF LIMITS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (573, N'OFFIRA TEX WORLD')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (574, N'Okane')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (575, N'OLAIAN By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (576, N'Old Grey')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (577, N'One8')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (578, N'one8 by Virat Kohli')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (579, N'one8 x PUMA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (580, N'ONLY & SONS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (581, N'ONN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (582, N'ORIGIN BY ZALORA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (583, N'ORUS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (584, N'OUTSHOCK By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (585, N'OVS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (586, N'Oxemberg')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (587, N'Oxolloxo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (588, N'Pactorn')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (589, N'PAPA BRANDS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (590, N'Parcel Yard')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (591, N'PARIS HAMILTON')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (592, N'Park Avenue')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (593, N'PAROKSH')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (594, N'Parx')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (595, N'Pashmoda')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (596, N'Pashtush')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (597, N'PAUSE SPORT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (598, N'Peony Cotton Fab')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (599, N'PEONY SMART WORLD')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (600, N'People')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (601, N'Pepe')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (602, N'Pepe Jeans')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (603, N'PEPLOS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (604, N'PEPPYZONE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (605, N'PERFKT-U')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (606, N'PERFLY By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (607, N'Peter England')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (608, N'Peter England Casuals')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (609, N'Peter England Elite')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (610, N'PETER ENGLAND UNIVERSITY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (611, N'PICOT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (612, N'Pierre Carlo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (613, N'pivot')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (614, N'PIVOTO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (615, N'Plagg')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (616, N'PLATINUM Studio')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (617, N'plusS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (618, N'Plutus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (619, N'PockMAN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (620, N'POKER ACTIVE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (621, N'Pootlu')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (622, N'POPLINS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (623, N'PORTBLAIR')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (624, N'PRAKASAM COTTON')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (625, N'PRIDE APPAREL')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (626, N'PRINCINN MEYER')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (627, N'Pro-Ethic STYLE DEVELOPER')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (628, N'Proline Active')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (629, N'PROTEENS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (630, N'Puma')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (631, N'PUMA Hoops')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (632, N'PUMA Motorsport')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (633, N'PUNK')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (634, N'Pure Play')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (635, N'Purple Feather')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (636, N'Purple State')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (637, N'QUANCIOUS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (638, N'QUARANTINE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (639, N'QUBIC')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (640, N'Quechua By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (641, N'Raa Jeans')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (642, N'Raas')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (643, N'RAD.MAD.BAD')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (644, N'RAJUBHAI HARGOVINDAS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (645, N'RAMRAJ COTTON')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (646, N'RANGOLI')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (647, N'Rapra The Label')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (648, N'RARE RABBIT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (649, N'rasm')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (650, N'Raymond')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (651, N'Readiprint Fashions')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (652, N'Red Chief')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (653, N'Red Tape')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (654, N'Reebok')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (655, N'Reebok Classic')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (656, N'Reich Color')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (657, N'Rex Straut Jeans')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (658, N'RG DESIGNERS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (659, N'RICHARD PARKER by Pantaloons')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (660, N'Richlook')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (661, N'Rick Masch')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (662, N'Rigo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (663, N'Roadster')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (664, N'Roadster Fast and Furious')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (665, N'rock.it')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (666, N'ROCKRIDER By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (667, N'Rodamo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (668, N'Rodzen')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (669, N'ROMEO ROSSI')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (670, N'Routeen')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (671, N'Royal Enfield')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (672, N'RUDRAKSH')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (673, N'RUF & TUF')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (674, N'RUG WOODS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (675, N'Ruggers')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (676, N'Russell Athletic')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (677, N'RVK')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (678, N's.Oliver')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (679, N'Saffron Threads')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (680, N'SALWAR STUDIO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (681, N'Sam and Jack')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (682, N'Sand Dune')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (683, N'Santonio')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (684, N'Sanwara')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (685, N'SAPPER')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (686, N'SayItLoud')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (687, N'SECRETS BY ZEROKAATA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (688, N'See Designs')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (689, N'SELA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (690, N'SELECTED')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (691, N'SELVAMAGAN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (692, N'Sethukrishna')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (693, N'SEVEN by MS Dhoni')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (694, N'Seven Rocks')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (695, N'SF JEANS by Pantaloons')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (696, N'SG')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (697, N'SG LEMAN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (698, N'SG RAJASAHAB')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (699, N'Shaftesbury London')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (700, N'Shahjada')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (701, N'SHIRT THEORY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (702, N'shopbloom')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (703, N'SHOPGARB')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (704, N'SHOWOFF')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (705, N'SHOWOFF Plus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (706, N'Shree')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (707, N'SHRESTHA BY VASTRAMAY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (708, N'SHVAAS by VASTRAMAY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (709, N'SI2 SLIP IN 2')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (710, N'SIAPA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (711, N'SIDEWOK')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (712, N'SIMON CARTER LONDON')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (713, N'Simond By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (714, N'SINGLE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (715, N'SKULT by Shahid Kapoor')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (716, N'Slazenger')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (717, N'Sloggi')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (718, N'Slub')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (719, N'Smarty Pants')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (720, N'SmileyWorld')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (721, N'Smugglerz')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (722, N'SMUGGLERZ INC.')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (723, N'Snitch')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (724, N'SockSoho')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (725, N'SOJANYA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (726, N'SOJANYA PLUS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (727, N'Solemio')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (728, N'Solly Jeans Co.')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (729, N'Solly Sport')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (730, N'SOLOGNAC By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (731, N'SORATIA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (732, N'Soul Space')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (733, N'Southbay')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (734, N'Soxytoes')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (735, N'SPACES')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (736, N'SPARROWHAWK')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (737, N'Speedo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (738, N'Spirit')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (739, N'Spiritus by pantaloons')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (740, N'Splash')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (741, N'SPORTO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (742, N'Sports52 wear')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (743, N'SPYKAR')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (744, N'Srey trends')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (745, N'Star Wars by Wear Your Mind')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (746, N'Status Quo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (747, N'Steenbok')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (748, N'Street Armor by Pantaloons')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (749, N'STROP')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (750, N'Style Quotient')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (751, N'SUBEA By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (752, N'Success')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (753, N'SUITLTD')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (754, N'Superdry')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (755, N'Supersox')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (756, N'Svanik')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (757, N'SWAGG INDIA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (758, N'Sweet Dreams')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (759, N'SWHF')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (760, N'Swiss Club')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (761, N'SWISS MILITARY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (762, N'Sztori')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (763, N'Sztori Batman')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (764, N'Sztori DC')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (765, N'Sztori Garfield')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (766, N'Sztori Marvel')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (767, N'Sztori Superman')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (768, N'Taavi')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (769, N'TABARD')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (770, N'TAHVO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (771, N'TARMAK By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (772, N'Tasarika')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (773, N'TATTVA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (774, N't-base')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (775, N'Teakwood Leathers')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (776, N'Ted Smith')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (777, N'Texlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (778, N'THANGAMAGAN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (779, N'THE BEAR HOUSE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (780, N'THE BONTE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (781, N'The Dry State')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (782, N'The Indian Garage Co')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (783, N'THE MILLION CLUB')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (784, N'The Roadster Lifestyle Co')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (785, N'The Souled Store')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (786, N'The Tie Hub')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (787, N'The Vanca')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (788, N'Theater')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (789, N'Theme')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (790, N'Thomas Scott')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (791, N'THREADCURRY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (792, N'Tiktauli De Corps.')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (793, N'Tiktauli De.Corps.')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (794, N'Tinted')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (795, N'TNG')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (796, N'Tom & Jerry By Sztori')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (797, N'TOM BURG')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (798, N'Tommy Hilfiger')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (799, N'Tossido')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (800, N'TREEMODA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (801, N'Trendyol')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (802, N'TRIBAN By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (803, N'Tribord By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (804, N'Trident')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (805, N'True Blue')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (806, N'Truerevo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (807, N'TRUNDZ')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (808, N'Tulsattva')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (809, N'Tuna London')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (810, N'Turtle')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (811, N'Tusok')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (812, N'U.S. Polo Assn.')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (813, N'U.S. Polo Assn. Denim Co.')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (814, N'U.S. Polo Assn. Tailored')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (815, N'UCLA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (816, N'ULTRAMATE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (817, N'UNDER ARMOUR')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (818, N'Undercolors of Benetton')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (819, N'UnderJeans by Spykar')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (820, N'United Colors of Benetton')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (821, N'UNSULLY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (822, N'Urban Dog')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (823, N'Urban Ranger by pantaloons')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (824, N'URBAN SCOTTISH')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (825, N'Urbano Fashion')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (826, N'Urbano Plus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (827, N'UrGear')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (828, N'Uri and MacKenzie')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (829, N'V Dot')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (830, N'V2 Value & Variety')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (831, N'Van Heusen')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (832, N'Van Heusen ACADEMY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (833, N'VAN HEUSEN DENIM LABS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (834, N'Van Heusen Flex')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (835, N'Van Heusen Sport')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (836, N'Vandnam Fabrics')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (837, N'VARA SILK')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (838, N'Vartah')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (839, N'VARUDU')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (840, N'Vastraa Fusion')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (841, N'VASTRAMAY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (842, N'VASTRAMAY PLUS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (843, N'VeBNoR')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (844, N'VEGA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (845, N'VEI SASTRE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (846, N'VEIRDO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (847, N'VENITIAN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (848, N'VILLAIN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (849, N'VIMAL')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (850, N'VIMAL JONNEY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (851, N'VINENZIA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (852, N'VividArtsy')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (853, N'V-Mart')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (854, N'Voi Jeans')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (855, N'VOXATI')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (856, N'VS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (857, N'VUDU')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (858, N'Waahiba')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (859, N'WAIMEA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (860, N'WATKO By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (861, N'Wear Your Mind')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (862, N'Wear Your Opinion')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (863, N'WEAVERS VILLA')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (864, N'WEDZE By Decathlon')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (865, N'WELBAWT')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (866, N'WESTCLO')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (867, N'wHATS DOwn')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (868, N'WHITE HEART')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (869, N'WILD WEST')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (870, N'WILD WEST Plus')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (871, N'Wildcraft')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (872, N'William White')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (873, N'Wills Lifestyle')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (874, N'Wintage')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (875, N'WITH')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (876, N'Wolfpack')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (877, N'Woodland')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (878, N'Woods')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (879, N'Wrangler')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (880, N'WROGN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (881, N'WROGN ACTIVE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (882, N'WTFUNK')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (883, N'WYRE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (884, N'XYXX')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (885, N'YAK YAK')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (886, N'Yogue Activewear')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (887, N'YOLOCLAN')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (888, N'YOONOY')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (889, N'YOVISH')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (890, N'Yuuki')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (891, N'Yuvraah')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (892, N'ZALORA ACTIVE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (893, N'ZALORA BASICS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (894, N'Zarlin')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (895, N'Zeal')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (896, N'zebu')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (897, N'Zeel')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (898, N'Zigo')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (899, N'Zotw')
GO
SET IDENTITY_INSERT [dbo].[Brand] OFF
GO
SET IDENTITY_INSERT [dbo].[Category] ON 
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (1, N'Bottom Wear')
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (2, N'Indian Wear')
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (3, N'Inner Wear &  Sleep Wear')
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (4, N'Plus Size')
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (5, N'Sports Wear')
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (6, N'Topwear')
GO
SET IDENTITY_INSERT [dbo].[Category] OFF
GO
SET IDENTITY_INSERT [dbo].[CategoryMapping] ON 
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (1, 1, 13)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (2, 1, 30)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (3, 1, 41)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (4, 1, 43)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (5, 2, 2)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (6, 2, 3)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (7, 2, 4)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (8, 2, 5)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (9, 2, 6)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (10, 2, 8)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (11, 2, 9)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (12, 2, 10)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (13, 2, 12)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (14, 2, 14)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (15, 2, 15)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (16, 2, 17)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (17, 2, 20)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (18, 2, 21)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (19, 2, 22)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (20, 2, 23)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (21, 2, 24)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (22, 2, 26)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (23, 2, 27)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (24, 2, 28)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (25, 2, 29)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (26, 2, 32)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (27, 2, 33)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (28, 2, 34)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (29, 2, 43)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (30, 2, 45)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (31, 2, 46)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (32, 3, 1)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (33, 3, 3)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (34, 3, 4)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (35, 3, 11)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (36, 3, 17)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (37, 3, 18)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (38, 3, 19)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (39, 3, 22)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (40, 3, 24)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (41, 3, 31)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (42, 3, 35)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (43, 3, 36)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (44, 3, 37)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (45, 3, 38)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (46, 3, 39)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (47, 3, 44)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (48, 4, 2)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (49, 4, 3)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (50, 4, 7)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (51, 4, 11)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (52, 4, 12)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (53, 4, 13)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (54, 4, 14)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (55, 4, 15)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (56, 4, 29)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (57, 4, 30)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (58, 4, 33)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (59, 4, 34)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (60, 4, 41)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (61, 4, 42)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (62, 4, 43)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (63, 4, 44)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (64, 4, 45)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (65, 5, 2)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (66, 5, 4)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (67, 5, 6)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (68, 5, 8)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (69, 5, 11)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (70, 5, 12)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (71, 5, 16)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (72, 5, 17)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (73, 5, 18)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (74, 5, 19)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (75, 5, 25)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (76, 5, 29)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (77, 5, 30)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (78, 5, 33)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (79, 5, 34)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (80, 5, 35)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (81, 5, 36)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (82, 5, 40)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (83, 5, 41)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (84, 5, 42)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (85, 5, 43)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (86, 5, 44)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (87, 5, 45)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (88, 6, 2)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (89, 6, 12)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (90, 6, 14)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (91, 6, 29)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (92, 6, 33)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (93, 6, 34)
GO
INSERT [dbo].[CategoryMapping] ([CategoryMappingId], [CategoryId], [IndividualCategoryId]) VALUES (94, 6, 45)
GO
SET IDENTITY_INSERT [dbo].[CategoryMapping] OFF
GO
SET IDENTITY_INSERT [dbo].[IndividualCategory] ON 
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (1, N'bath-robe')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (2, N'blazers')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (3, N'boxers')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (4, N'briefs')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (5, N'churidar')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (6, N'clothing-set')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (7, N'coats')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (8, N'co-ords')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (9, N'dhotis')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (10, N'dupatta')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (11, N'innerwear-vests')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (12, N'jackets')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (13, N'jeans')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (14, N'kurtas')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (15, N'kurta-sets')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (16, N'leggings')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (17, N'lounge-pants')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (18, N'lounge-shorts')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (19, N'lounge-tshirts')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (20, N'lungi')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (21, N'nehru-jackets')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (22, N'night-suits')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (23, N'patiala')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (24, N'pyjamas')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (25, N'rain-jacket')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (26, N'salwar')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (27, N'shawl')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (28, N'sherwani')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (29, N'shirts')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (30, N'shorts')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (31, N'socks')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (32, N'suits')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (33, N'sweaters')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (34, N'sweatshirts')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (35, N'swim-bottoms')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (36, N'swimwear')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (37, N'thermal-bottoms')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (38, N'thermal-set')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (39, N'thermal-tops')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (40, N'tights')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (41, N'track-pants')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (42, N'tracksuits')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (43, N'trousers')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (44, N'trunk')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (45, N'tshirts')
GO
INSERT [dbo].[IndividualCategory] ([IndividualCategoryId], [IndividualCategoryName]) VALUES (46, N'waistcoat')
GO
SET IDENTITY_INSERT [dbo].[IndividualCategory] OFF
GO
SET IDENTITY_INSERT [dbo].[IndividualCategorySizeMapping] ON 
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (1, 1, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (2, 1, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (3, 1, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (4, 1, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (5, 1, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (6, 2, 6)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (7, 2, 7)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (8, 2, 8)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (9, 2, 9)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (10, 2, 10)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (11, 3, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (12, 3, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (13, 3, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (14, 3, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (15, 3, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (16, 4, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (17, 4, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (18, 4, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (19, 4, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (20, 4, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (21, 5, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (22, 5, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (23, 5, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (24, 5, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (25, 5, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (26, 6, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (27, 6, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (28, 6, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (29, 6, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (30, 6, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (31, 7, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (32, 7, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (33, 7, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (34, 7, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (35, 7, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (36, 8, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (37, 8, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (38, 8, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (39, 8, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (40, 8, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (41, 9, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (42, 9, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (43, 9, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (44, 9, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (45, 9, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (46, 10, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (47, 10, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (48, 10, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (49, 10, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (50, 10, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (51, 11, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (52, 11, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (53, 11, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (54, 11, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (55, 11, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (56, 12, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (57, 12, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (58, 12, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (59, 12, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (60, 12, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (61, 13, 6)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (62, 13, 7)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (63, 13, 8)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (64, 13, 9)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (65, 13, 10)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (66, 14, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (67, 14, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (68, 14, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (69, 14, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (70, 14, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (71, 15, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (72, 15, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (73, 15, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (74, 15, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (75, 15, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (76, 16, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (77, 16, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (78, 16, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (79, 16, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (80, 16, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (81, 17, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (82, 17, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (83, 17, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (84, 17, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (85, 17, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (86, 18, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (87, 18, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (88, 18, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (89, 18, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (90, 18, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (91, 19, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (92, 19, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (93, 19, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (94, 19, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (95, 19, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (96, 20, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (97, 20, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (98, 20, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (99, 20, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (100, 20, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (101, 21, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (102, 21, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (103, 21, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (104, 21, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (105, 21, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (106, 22, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (107, 22, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (108, 22, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (109, 22, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (110, 22, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (111, 23, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (112, 23, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (113, 23, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (114, 23, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (115, 23, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (116, 24, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (117, 24, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (118, 24, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (119, 24, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (120, 24, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (121, 25, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (122, 25, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (123, 25, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (124, 25, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (125, 25, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (126, 26, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (127, 26, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (128, 26, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (129, 26, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (130, 26, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (131, 27, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (132, 27, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (133, 27, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (134, 27, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (135, 27, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (136, 28, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (137, 28, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (138, 28, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (139, 28, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (140, 28, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (141, 29, 6)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (142, 29, 7)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (143, 29, 8)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (144, 29, 9)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (145, 29, 10)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (146, 30, 6)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (147, 30, 7)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (148, 30, 8)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (149, 30, 9)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (150, 30, 10)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (151, 31, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (152, 31, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (153, 31, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (154, 31, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (155, 31, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (156, 32, 6)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (157, 32, 7)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (158, 32, 8)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (159, 32, 9)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (160, 32, 10)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (161, 33, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (162, 33, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (163, 33, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (164, 33, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (165, 33, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (166, 34, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (167, 34, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (168, 34, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (169, 34, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (170, 34, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (171, 35, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (172, 35, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (173, 35, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (174, 35, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (175, 35, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (176, 36, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (177, 36, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (178, 36, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (179, 36, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (180, 36, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (181, 37, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (182, 37, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (183, 37, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (184, 37, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (185, 37, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (186, 38, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (187, 38, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (188, 38, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (189, 38, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (190, 38, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (191, 39, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (192, 39, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (193, 39, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (194, 39, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (195, 39, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (196, 40, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (197, 40, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (198, 40, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (199, 40, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (200, 40, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (201, 41, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (202, 41, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (203, 41, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (204, 41, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (205, 41, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (206, 42, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (207, 42, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (208, 42, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (209, 42, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (210, 42, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (211, 43, 6)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (212, 43, 7)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (213, 43, 8)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (214, 43, 9)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (215, 43, 10)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (216, 44, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (217, 44, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (218, 44, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (219, 44, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (220, 44, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (221, 45, 1)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (222, 45, 2)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (223, 45, 3)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (224, 45, 4)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (225, 45, 5)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (226, 46, 6)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (227, 46, 7)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (228, 46, 8)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (229, 46, 9)
GO
INSERT [dbo].[IndividualCategorySizeMapping] ([IndividualCategorySizeMappingId], [IndividualCategoryId], [SizeId]) VALUES (230, 46, 10)
GO
SET IDENTITY_INSERT [dbo].[IndividualCategorySizeMapping] OFF
GO