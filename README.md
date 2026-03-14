# Think Link Sync

Think Link Sync is a real-time, interactive web application designed for teams to align their priorities and build consensus. Participants can create, reorder, and sync their priority lists in real-time while observing others' thoughts.

![License](https://img.shields.io/badge/license-ISC-blue.svg)

## Key Features

- **Real-time Synchronization**: Every reorder, addition, and edit is synced instantly across all connected participants via Socket.io.
- **Bulk Item Addition**: Paste multi-line text into the input area to add multiple items at once.
- **Markdown Export**: Copy any board's contents directly to your clipboard in Markdown format, ready for meeting minutes or documentation.
- **Modern Dark UI**: A sleek, dark-themed interface focused on clarity and reducing eye strain.
- **Viewer & Participant Modes**: Start as a viewer to see the current alignment and join the discussion with a single click.
- **Persistent Usernames**: Set your display name once, and it will be remembered for future sessions.
- **Global Reset**: Clear all items for all users to start a fresh discussion instantly.

## Tech Stack

- **Backend**: Node.js, Express
- **Real-time**: Socket.io
- **Frontend**: Vanilla JavaScript, SortableJS, HTML5, CSS3

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd think-link-sync
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Access the app:
   Open your browser and navigate to `http://localhost:3000`.

## How to Use

1. **Join**: Click "Join sync to participate" and enter your name.
2. **Add**: Type a task or paste a list into the top text area and press Enter.
3. **Organize**: Drag and drop items in your board to set your priority.
4. **Edit/Delete**: Click the pencil icon on any item to rename or remove it.
5. **Copy**: Click the clipboard icon on any board to copy its state as Markdown.
6. **Reset**: Click the trash icon in the top right to start a new discussion (clears items for everyone).

## License

This project is licensed under the ISC License.
