Idk why but thought that Batgirl surfing the ocean aka सागर; would just be awesome.

# Batgirl for MS Edge Surf

A custom extension that replaces the default surfer character with Batgirl in Microsoft Edge's built-in Surf game.

![Batgirl Surf Extension](assets/screenshots/preview.png)

## Features

- Replaces the default surfer with a Batgirl character
- Multiple costume variants to choose from
- Animated cape physics during gameplay
- Settings panel for customization options

## Installation

### For End Users

1. Download the extension package (zip file)
2. Extract the contents to a folder
3. Open Microsoft Edge and navigate to `edge://extensions/`
4. Enable "Developer mode" in the bottom-left corner
5. Click "Load unpacked" and select the extracted folder
6. The extension is now installed! Navigate to `edge://surf` to play with Batgirl

### For Developers

#### Prerequisites

- Node.js (v14+)
- npm or yarn

#### Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Build the extension:
   ```
   npm run build
   ```
5. Load the extension from the `dist` folder following the end-user instructions above

## Development

### Project Structure

```
batgirl-edge-surf/
├── assets/               # Images, sprites, and icons
│   ├── icons/            # Extension icons
│   ├── sprites/          # Character sprites
│   └── screenshots/      # Screenshots for documentation
├── src/                  # Source code
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # CSS styles
│   ├── utils/            # Utility functions
│   ├── background.ts     # Extension background script
│   ├── content.ts        # Content script injected into the game
│   ├── popup.tsx         # Extension popup UI
│   └── types.ts          # TypeScript type definitions
├── public/               # Static files
├── manifest.json         # Extension manifest
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # This documentation
```

### How It Works

This extension uses content scripts to modify the Surf game's assets at runtime. When the game loads, our script intercepts the character sprite requests and replaces them with the Batgirl sprites.

The background script handles communication between the popup UI and the content script, allowing users to change settings without reloading the game.

### Creating New Character Variants

To add a new Batgirl costume variant:

1. Add new sprite sheets to the `assets/sprites/` directory
2. Register the new variant in `src/types.ts` by adding it to the `CostumeVariant` enum
3. Add the sprite mapping in `src/utils/spriteMapper.ts`
4. Update the UI in `src/components/CostumeSelector.tsx` to include the new option

## Limitations

- The extension only works in Microsoft Edge
- Due to browser restrictions, the extension cannot be published to the Chrome Web Store or Microsoft Store
- The extension may break if Microsoft updates the Surf game

## License

MIT License - See LICENSE file for details

## Credits

- Developed by [Your Name]
- Batgirl character based on DC Comics character owned by Warner Bros.
- Special thanks to the Microsoft Edge team for the awesome Surf game!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
