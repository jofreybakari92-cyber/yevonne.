// ==================== STORAGE KEYS ====================
const STORAGE_KEYS = {
    memories: 'amina_memories',
    wishes: 'amina_wishes',
    stories: 'amina_stories',
    books: 'amina_books',
    songs: 'amina_songs',
    startDate: 'amina_start_date'
};

// ==================== INITIALIZATION ====================
function initializeData() {
    // Set start date if not set
    if (!localStorage.getItem(STORAGE_KEYS.startDate)) {
        localStorage.setItem(STORAGE_KEYS.startDate, new Date().toISOString());
    }

    // Initialize sample memories
    if (!localStorage.getItem(STORAGE_KEYS.memories)) {
        const sampleMemories = [
            { id: 1, title: 'First Sushi Date', emoji: '🍣', desc: 'The day we discovered our shared love for sushi!', date: '2024-02-14' },
            { id: 2, title: 'First Horror Movie', emoji: '🎬', desc: 'Watching our first scary movie together!', date: '2024-03-15' },
            { id: 3, title: 'Travel Dreams', emoji: '✈️', desc: 'Planning our adventures around the world!', date: '2024-04-01' }
        ];
        localStorage.setItem(STORAGE_KEYS.memories, JSON.stringify(sampleMemories));
    }

    // Initialize sample wishes
    if (!localStorage.getItem(STORAGE_KEYS.wishes)) {
        const sampleWishes = [
            { id: 1, text: 'Visit Tokyo together', category: 'travel', completed: false },
            { id: 2, text: 'Watch all horror movies on our list', category: 'adventure', completed: false },
            { id: 3, text: 'Learn to make sushi at home', category: 'goals', completed: false }
        ];
        localStorage.setItem(STORAGE_KEYS.wishes, JSON.stringify(sampleWishes));
    }

    // Initialize sample songs
    if (!localStorage.getItem(STORAGE_KEYS.songs)) {
        const sampleSongs = [
            { id: 1, title: 'Perfect', artist: 'Ed Sheeran', note: 'Our song 💕' },
            { id: 2, title: 'All of Me', artist: 'John Legend', note: 'For those movie nights' },
            { id: 3, title: 'A Thousand Years', artist: 'Christina Perri', note: 'Forever and always' }
        ];
        localStorage.setItem(STORAGE_KEYS.songs, JSON.stringify(sampleSongs));
    }
}

// ==================== NAVIGATION ====================
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Special page loading
    if (pageId === 'playlist') {
        loadMusicPlayer();
    }
}

// ==================== FLOATING HEARTS ====================
function createHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💕', '💗', '💖', '💓', '💘', '💝'];
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.animationDuration = (6 + Math.random() * 4) + 's';
        heart.style.fontSize = (15 + Math.random() * 20) + 'px';
        container.appendChild(heart);
    }
}

// ==================== SPARKLES ====================
function createSparkles() {
    const container = document.getElementById('sparkles');
    
    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.width = (2 + Math.random() * 4) + 'px';
        sparkle.style.height = sparkle.style.width;
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.style.animationDuration = (2 + Math.random() * 2) + 's';
        container.appendChild(sparkle);
    }
}

// ==================== CELEBRATION ====================
function celebrate() {
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.id = 'celebration';
    document.body.appendChild(celebration);

    const colors = ['#ff6b9d', '#c06c84', '#f67280', '#ffd1dc', '#ff9a9e'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        celebration.appendChild(confetti);
    }

    setTimeout(() => {
        celebration.remove();
    }, 5000);
}

// ==================== MEMORIES ====================
function addMemory() {
    const title = document.getElementById('memoryTitle').value;
    const emoji = document.getElementById('memoryEmoji').value;
    const desc = document.getElementById('memoryDesc').value;
    const date = document.getElementById('memoryDate').value;

    if (!title || !emoji) {
        alert('Please fill in title and emoji for your memory!');
        return;
    }

    const memories = JSON.parse(localStorage.getItem(STORAGE_KEYS.memories) || '[]');
    memories.unshift({
        id: Date.now(),
        title,
        emoji,
        desc,
        date: date || new Date().toISOString().split('T')[0]
    });

    localStorage.setItem(STORAGE_KEYS.memories, JSON.stringify(memories));

    // Clear form
    document.getElementById('memoryTitle').value = '';
    document.getElementById('memoryEmoji').value = '';
    document.getElementById('memoryDesc').value = '';
    document.getElementById('memoryDate').value = '';

    loadMemories();
    celebrate();
    updateStats();
}

function loadMemories() {
    const memories = JSON.parse(localStorage.getItem(STORAGE_KEYS.memories) || '[]');
    const grid = document.getElementById('memoriesGrid');
    grid.innerHTML = '';

    if (memories.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #ffd1dc; grid-column: 1/-1; padding: 40px;">No memories yet! Start creating beautiful moments together 💕</p>';
        return;
    }

    memories.forEach(memory => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `
            <div class="memory-image">${memory.emoji}</div>
            <div class="memory-content">
                <h3 style="color: #ff6b9d;">${memory.title}</h3>
                <p style="color: #ffd1dc; margin: 10px 0;">${memory.desc || ''}</p>
                <p style="color: #c06c84; font-size: 0.85rem;">📅 ${memory.date}</p>
                <button class="delete-btn" onclick="deleteMemory(${memory.id})">Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function deleteMemory(id) {
    if (confirm('Are you sure you want to delete this memory?')) {
        let memories = JSON.parse(localStorage.getItem(STORAGE_KEYS.memories) || '[]');
        memories = memories.filter(m => m.id !== id);
        localStorage.setItem(STORAGE_KEYS.memories, JSON.stringify(memories));
        loadMemories();
        updateStats();
    }
}

function openMemoryModal(id) {
    const memories = JSON.parse(localStorage.getItem(STORAGE_KEYS.memories) || '[]');
    const memory = memories.find(m => m.id === id);
    
    if (memory) {
        document.getElementById('modalMemoryTitle').textContent = memory.title;
        document.getElementById('modalMemoryEmoji').textContent = memory.emoji;
        document.getElementById('modalMemoryDesc').textContent = memory.desc;
        document.getElementById('modalMemoryDate').textContent = memory.date;
        document.getElementById('memoryModal').classList.add('show');
    }
}

function closeMemoryModal() {
    document.getElementById('memoryModal').classList.remove('show');
}

// ==================== WISHES ====================
function addWish() {
    const wish = document.getElementById('wishInput').value;
    const category = document.getElementById('wishCategory').value;

    if (!wish) {
        alert('Please write your wish or dream!');
        return;
    }

    const wishes = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishes) || '[]');
    wishes.unshift({
        id: Date.now(),
        text: wish,
        category,
        completed: false
    });

    localStorage.setItem(STORAGE_KEYS.wishes, JSON.stringify(wishes));

    document.getElementById('wishInput').value = '';
    loadWishes();
    celebrate();
    updateStats();
}

function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishes) || '[]');
    const container = document.getElementById('wishesList');
    container.innerHTML = '';

    if (wishes.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #ffd1dc; padding: 40px;">No wishes yet! Start dreaming together 💕</p>';
        return;
    }

    const categories = {
        travel: '✈️ Travel Dreams',
        goals: '🎯 Life Goals',
        prayer: '🙏 Prayers',
        adventure: '🌟 Adventures'
    };

    wishes.forEach(wish => {
        const item = document.createElement('div');
        item.className = 'wish-item';
        item.innerHTML = `
            <h3>${categories[wish.category] || '⭐'}</h3>
            <p>${wish.text}</p>
            <span class="wish-status ${wish.completed ? 'completed' : 'pending'}" onclick="toggleWish(${wish.id})">
                ${wish.completed ? '✓ Completed' : '○ In Progress'}
            </span>
            <button class="delete-btn" onclick="deleteWish(${wish.id})" style="margin-left: 10px;">Delete</button>
        `;
        container.appendChild(item);
    });
}

function toggleWish(id) {
    let wishes = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishes) || '[]');
    const wish = wishes.find(w => w.id === id);
    if (wish) {
        wish.completed = !wish.completed;
        localStorage.setItem(STORAGE_KEYS.wishes, JSON.stringify(wishes));
        loadWishes();
    }
}

function deleteWish(id) {
    if (confirm('Are you sure you want to delete this wish?')) {
        let wishes = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishes) || '[]');
        wishes = wishes.filter(w => w.id !== id);
        localStorage.setItem(STORAGE_KEYS.wishes, JSON.stringify(wishes));
        loadWishes();
        updateStats();
    }
}

// ==================== STORIES ====================
function addStory() {
    const title = document.getElementById('storyTitle').value;
    const content = document.getElementById('storyContent').value;

    if (!title || !content) {
        alert('Please fill in both title and story!');
        return;
    }

    const stories = JSON.parse(localStorage.getItem(STORAGE_KEYS.stories) || '[]');
    stories.unshift({
        id: Date.now(),
        title,
        content,
        date: new Date().toISOString().split('T')[0]
    });

    localStorage.setItem(STORAGE_KEYS.stories, JSON.stringify(stories));

    document.getElementById('storyTitle').value = '';
    document.getElementById('storyContent').value = '';
    
    loadStories();
    celebrate();
}

function loadStories() {
    const stories = JSON.parse(localStorage.getItem(STORAGE_KEYS.stories) || '[]');
    const container = document.getElementById('storiesList');
    container.innerHTML = '';

    if (stories.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #ffd1dc; padding: 40px;">No stories yet! Write your first love story 💕</p>';
        return;
    }

    stories.forEach(story => {
        const card = document.createElement('div');
        card.className = 'story-card';
        card.innerHTML = `
            <h3>${story.title}</h3>
            <div class="story-meta">📅 ${story.date}</div>
            <p>${story.content}</p>
            <button class="delete-btn" onclick="deleteStory(${story.id})">Delete</button>
        `;
        container.appendChild(card);
    });
}

function deleteStory(id) {
    if (confirm('Are you sure you want to delete this story?')) {
        let stories = JSON.parse(localStorage.getItem(STORAGE_KEYS.stories) || '[]');
        stories = stories.filter(s => s.id !== id);
        localStorage.setItem(STORAGE_KEYS.stories, JSON.stringify(stories));
        loadStories();
    }
}

function generateStoryIdeas() {
    const prompts = [
        "💡 Tell the story of how we first met",
        "💡 Write about our first date",
        "💡 Describe what makes Amina unique",
        "💡 Share a favorite memory together",
        "💡 Write about our travel dreams",
        "💡 Describe a perfect day with Amina",
        "💡 Tell the story of a surprise moment",
        "💡 Write about what you love most about Amina",
        "💡 Share a funny moment from our relationship",
        "💡 Describe our future together"
    ];

    const promptsList = document.getElementById('promptsList');
    promptsList.innerHTML = prompts.map(p => 
        `<p style="padding: 15px; background: rgba(255,107,157,0.1); border-radius: 10px; margin: 10px 0; cursor: pointer;" 
            onclick="usePrompt('${p.replace('💡 ', '')}')">${p}</p>`
    ).join('');
    
    document.getElementById('aiPrompts').style.display = 'block';
}

function usePrompt(prompt) {
    document.getElementById('storyTitle').value = prompt;
    document.getElementById('storyContent').focus();
    window.scrollTo(0, 0);
}

// ==================== BOOKS ====================
function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const notes = document.getElementById('bookNotes').value;

    if (!title || !author) {
        alert('Please fill in title and author!');
        return;
    }

    const books = JSON.parse(localStorage.getItem(STORAGE_KEYS.books) || '[]');
    books.unshift({
        id: Date.now(),
        title,
        author,
        notes
    });

    localStorage.setItem(STORAGE_KEYS.books, JSON.stringify(books));
    
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookNotes').value = '';

    loadCustomBooks();
    celebrate();
}

function loadCustomBooks() {
    const books = JSON.parse(localStorage.getItem(STORAGE_KEYS.books) || '[]');
    const container = document.getElementById('customBooks');
    container.innerHTML = '';

    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-icon">📘</div>
            <div class="book-info">
                <h3>${book.title} - ${book.author}</h3>
                <p>${book.notes}</p>
                <button class="delete-btn" onclick="deleteBook(${book.id})">Delete</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        let books = JSON.parse(localStorage.getItem(STORAGE_KEYS.books) || '[]');
        books = books.filter(b => b.id !== id);
        localStorage.setItem(STORAGE_KEYS.books, JSON.stringify(books));
        loadCustomBooks();
    }
}

// ==================== MUSIC PLAYER ====================
let currentlyPlaying = null;
let currentSongIndex = -1;
let songProgress = {};

function loadMusicPlayer() {
    const songs = JSON.parse(localStorage.getItem(STORAGE_KEYS.songs) || '[]');
    const container = document.getElementById('musicPlayerContainer');
    container.innerHTML = '';

    if (songs.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #ffd1dc; padding: 40px;">No songs in your playlist yet! Add your favorite songs 💕</p>';
        return;
    }

    songs.forEach((song, index) => {
        const player = document.createElement('div');
        player.className = 'music-player';
        player.innerHTML = `
            <h3 style="color: #ff6b9d; margin-bottom: 10px;">🎵 ${song.title} - ${song.artist}</h3>
            <p style="color: #ffd1dc; font-size: 0.9rem;">${song.note}</p>
            <div class="music-controls">
                <button class="play-btn" onclick="togglePlay(${index})" id="playBtn${index}">▶️</button>
                <div class="progress-bar" onclick="seekSong(event, ${index})" id="progressBar${index}">
                    <div class="progress-fill" id="progressFill${index}"></div>
                </div>
                <span class="time-display" id="timeDisplay${index}">0:00 / 3:30</span>
            </div>
        `;
        container.appendChild(player);
    });
}

function togglePlay(index) {
    const btn = document.getElementById(`playBtn${index}`);
    
    // Stop currently playing song
    if (currentlyPlaying !== null && currentlyPlaying !== index) {
        const prevBtn = document.getElementById(`playBtn${currentlyPlaying}`);
        prevBtn.textContent = '▶️';
        prevBtn.style.background = '#ff6b9d';
        clearInterval(songProgress[currentlyPlaying]);
    }

    if (currentlyPlaying === index) {
        // Pause current song
        btn.textContent = '▶️';
        btn.style.background = '#ff6b9d';
        clearInterval(songProgress[index]);
        currentlyPlaying = null;
    } else {
        // Play new song
        btn.textContent = '⏸️';
        btn.style.background = '#c06c84';
        currentlyPlaying = index;
        startSongProgress(index);
    }
}

function startSongProgress(index) {
    let progress = 0;
    const duration = 210; // 3:30 in seconds
    
    songProgress[index] = setInterval(() => {
        progress += 0.5;
        const percent = (progress / duration) * 100;
        
        const fill = document.getElementById(`progressFill${index}`);
        if (fill) {
            fill.style.width = percent + '%';
        }
        
        const display = document.getElementById(`timeDisplay${index}`);
        if (display) {
            const currentTime = Math.floor(progress);
            const minutes = Math.floor(currentTime / 60);
            const seconds = currentTime % 60;
            display.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} / 3:30`;
        }

        if (progress >= duration) {
            clearInterval(songProgress[index]);
            const btn = document.getElementById(`playBtn${index}`);
            if (btn) {
                btn.textContent = '▶️';
                btn.style.background = '#ff6b9d';
            }
            currentlyPlaying = null;
        }
    }, 500);
}

function seekSong(event, index) {
    const bar = event.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = ((event.clientX - rect.left) / rect.width) * 100;
    const fill = document.getElementById(`progressFill${index}`);
    if (fill) {
        fill.style.width = percent + '%';
    }
}

// ==================== CHAT BOT ====================
const chatContext = {
    userName: 'Amina',
    favorites: {
        food: 'sushi',
        activities: ['traveling', 'horror movies'],
        places: ['Tokyo', 'Paris', 'Santorini', 'Bali']
    }
};

const aiResponses = {
    greeting: [
        "Hey there! 💕 How can I help you celebrate your amazing relationship today?",
        "Hi! 💖 Ready to plan something special for Amina?",
        "Hello! 🌹 What would you like to chat about?"
    ],
    dateIdeas: [
        "How about a sushi-making class together? 🍣 You could learn to make your favorite rolls!",
        "Plan a horror movie marathon with all her favorites, complete with cozy blankets and snacks! 🎬",
        "Surprise her with a weekend getaway to a place on your bucket list! ✈️",
        "Book a romantic dinner at that new sushi restaurant you've been wanting to try! 🍱",
        "Create a scavenger hunt leading to different places that are special to you both! 💝",
        "Plan a picnic at sunset with her favorite foods and a playlist of your songs! 🌅"
    ],
    travel: [
        "Tokyo would be perfect for Amina! Amazing sushi AND unique experiences! 🗼🍣",
        "Paris is always romantic - imagine strolling the streets hand in hand! 🗼💕",
        "Bali offers both adventure and relaxation - perfect for you two! 🏝️",
        "Santorini's sunsets would be breathtaking to share together! 🌅"
    ],
    movies: [
        "If she loves The Conjuring, try 'The Conjuring 2' or 'Annabelle' for more scares! 👻",
        "For something really intense, check out 'Midsommar' or 'The Wailing'! 😱",
        "Classic horror: 'The Exorcist' or 'Rosemary's Baby' are must-watches! 🎃",
        "'Train to Busan' is a great zombie thriller if you want something different! 🚂"
    ],
    gifts: [
        "A personalized photo album of your memories together would be so meaningful! 📸",
        "Plan a surprise trip to Tokyo - she'd love experiencing the sushi culture! ✈️",
        "Custom jewelry with coordinates of your special places! 💎",
        "A 'horror movie date night' subscription box with movie picks and snacks! 🎬",
        "Cooking class for making sushi at home together! 🍱"
    ],
    love: [
        "The best relationships grow stronger through shared adventures - keep exploring together! 💕",
        "Quality time is the greatest gift - whether it's sushi dates or movie nights! ⏰",
        "Your shared interests create the perfect foundation for lasting love! 💝",
        "Keep making memories together - they're the treasures of a lifetime! 🌹"
    ]
};

function sendMessage() {
    const input = document.getElementById('chatInput');
    const messagesDiv = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    
    if (!input || input.value.trim() === '') return;

    const userMessage = input.value.toLowerCase();

    // User message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerHTML = '<p>' + input.value + '</p>';
    messagesDiv.appendChild(userMsg);
    input.value = '';

    // Show typing indicator
    typingIndicator.classList.add('show');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Generate AI response
    setTimeout(() => {
        typingIndicator.classList.remove('show');
        
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot';
        
        let response = generateAIResponse(userMessage);
        
        botMsg.innerHTML = '<p>' + response + '</p>';
        messagesDiv.appendChild(botMsg);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 1500);
}

function generateAIResponse(message) {
    // Simple keyword-based AI responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)];
    }
    
    if (message.includes('date') || message.includes('plan') || message.includes('idea')) {
        return aiResponses.dateIdeas[Math.floor(Math.random() * aiResponses.dateIdeas.length)];
    }
    
    if (message.includes('travel') || message.includes('trip') || message.includes('vacation')) {
        return aiResponses.travel[Math.floor(Math.random() * aiResponses.travel.length)];
    }
    
    if (message.includes('movie') || message.includes('horror') || message.includes('watch')) {
        return aiResponses.movies[Math.floor(Math.random() * aiResponses.movies.length)];
    }
    
    if (message.includes('gift') || message.includes('present') || message.includes('surprise')) {
        return aiResponses.gifts[Math.floor(Math.random() * aiResponses.gifts.length)];
    }
    
    if (message.includes('sushi')) {
        return "Sushi is such a great shared passion! 🍣 Have you tried making it together at home? It's a fun date activity and you learn something new together! Or plan a sushi restaurant tour - visit different places and rate them! 🍱";
    }

    if (message.includes('love') || message.includes('relationship')) {
        return aiResponses.love[Math.floor(Math.random() * aiResponses.love.length)];
    }

    // Default responses
    const defaultResponses = [
        "That's wonderful! Amina is lucky to have someone who cares so much! 💕",
        "Tell me more! I'm here to help make your relationship even more special! 💖",
        "I love that! What else would you like to know? 🌹",
        "Great question! Based on what I know about Amina, she'd probably love something involving travel or good food! ✈️🍣",
        "Remember, the best gifts come from the heart. What makes Amina smile? 😊"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// ==================== DAILY INSPIRATION ====================
const loveQuotes = [
    "Amina, you make every adventure more beautiful just by being there. Every sunrise is brighter, every sushi roll tastes better, and every scary movie is more thrilling when I'm with you.",
    "Your smile is my favorite view, better than any travel destination. When you laugh, the whole world lights up, and I fall in love all over again.",
    "Every sushi date with you is a journey to happiness. It's not just about the food - it's about the conversations, the laughter, and the way we can make ordinary moments extraordinary together.",
    "I love how you're brave enough to watch horror movies but sweet enough to hold my hand. Your strength and tenderness inspire me every day.",
    "Traveling the world means nothing without you by my side. Every destination is just a place until we create memories there together.",
    "You're not just my Valentine - you're my forever adventure. Every day with you is a new chapter in the greatest story ever told.",
    "Every day with you is a new page in our love story, and I can't wait to see what adventures tomorrow brings.",
    "Amina, you are my favorite hello and my hardest goodbye. Distance means nothing when someone means everything.",
    "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    "You are my today and all of my tomorrows. Every moment spent with you is a moment I treasure.",
    "I choose you. And I'll choose you over and over and over. Without pause, without a doubt, in a heartbeat. I'll keep choosing you.",
    "Together we create our own paradise - whether it's a sushi bar, a movie theater, or anywhere in the world. Home is wherever you are."
];

const bibleVerses = [
    { text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", ref: "1 Corinthians 13:4" },
    { text: "Above all, love each other deeply, because love covers over a multitude of sins.", ref: "1 Peter 4:8" },
    { text: "There is no fear in love. But perfect love drives out fear.", ref: "1 John 4:18" },
    { text: "Love never fails. But where there are prophecies, they will cease; where there are tongues, they will be stilled; where there is knowledge, it will pass away.", ref: "1 Corinthians 13:8" },
    { text: "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up.", ref: "Ecclesiastes 4:9-10" },
    { text: "Place me like a seal over your heart, like a seal on your arm; for love is as strong as death.", ref: "Song of Solomon 8:6" },
    { text: "Therefore what God has joined together, let no one separate.", ref: "Mark 10:9" },
    { text: "And now these three remain: faith, hope and love. But the greatest of these is love.", ref: "1 Corinthians 13:13" }
];

function generateNewQuote() {
    const quote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
    const verse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
    
    const quoteElement = document.getElementById('dailyQuote');
    const verseElement = document.getElementById('dailyVerse');
    const refElement = document.getElementById('verseRef');
    
    if (quoteElement) quoteElement.textContent = quote;
    if (verseElement) verseElement.textContent = verse.text;
    if (refElement) refElement.textContent = '- ' + verse.ref;
    
    celebrate();
}

// ==================== NOTIFICATIONS ====================
function enableNotifications() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            const statusElement = document.getElementById('notificationStatus');
            if (statusElement) {
                if (permission === 'granted') {
                    statusElement.textContent = '✅ Daily love messages enabled! You\'ll receive beautiful messages every day at 9 AM! 💕';
                    
                    // Show sample notification
                    new Notification('💕 Daily Love Message', {
                        body: 'Good morning! Here\'s your daily dose of love from your Valentine app!',
                        icon: '❤️'
                    });

                    // Store notification preference
                    localStorage.setItem('notifications_enabled', 'true');
                    localStorage.setItem('notification_time', '09:00');
                    
                    celebrate();
                } else {
                    statusElement.textContent = '❌ Notifications blocked. Please enable them in your browser settings.';
                }
            }
        });
    } else {
        const statusElement = document.getElementById('notificationStatus');
        if (statusElement) {
            statusElement.textContent = '💕 Notifications not supported on this device, but the love is still here!';
        }
    }
}

// Check and send daily notification
function checkDailyNotification() {
    if (localStorage.getItem('notifications_enabled') === 'true') {
        const now = new Date();
        const lastNotification = localStorage.getItem('last_notification_date');
        const today = now.toDateString();

        if (lastNotification !== today && now.getHours() === 9) {
            const quote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
            
            if (Notification.permission === 'granted') {
                new Notification('💕 Daily Love Message for Amina', {
                    body: quote.substring(0, 100) + '...',
                    icon: '❤️'
                });
                
                localStorage.setItem('last_notification_date', today);
            }
        }
    }
}

// Check for notifications every minute
setInterval(checkDailyNotification, 60000);

// ==================== SOCIAL SHARING ====================
function shareToSocial(platform, customText = '') {
    const text = customText || `❤️ Check out this amazing Valentine's message! 💕 #ValentinesDay #Love #Amina`;
    const url = window.location.href;

    const shareLinks = {
        instagram: `https://www.instagram.com/`,
        tiktok: `https://www.tiktok.com/`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };

    if (platform === 'instagram' || platform === 'tiktok') {
        alert(`📱 To share on ${platform}:\n\n1. Take a screenshot of this page\n2. Open ${platform}\n3. Create a new post\n4. Upload the screenshot\n5. Add your caption!\n\nSuggested caption: ${text}`);
    } else if (shareLinks[platform]) {
        window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
}

// ==================== STATISTICS ====================
function updateStats() {
    // Calculate days together
    const startDate = new Date(localStorage.getItem(STORAGE_KEYS.startDate));
    const today = new Date();
    const daysTogether = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    
    const memories = JSON.parse(localStorage.getItem(STORAGE_KEYS.memories) || '[]');
    const wishes = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishes) || '[]');

    // Animate counters
    animateCounter('daysCounter', daysTogether);
    animateCounter('memoriesCounter', memories.length);
    animateCounter('wishesCounter', wishes.length);
}

function animateCounter(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let current = 0;
    const increment = Math.ceil(target / 50);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current;
    }, 30);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    createHearts();
    createSparkles();
    generateNewQuote();
    loadMemories();
    loadWishes();
    loadStories();
    loadCustomBooks();
    updateStats();

    // Check for notification permission on load
    if (localStorage.getItem('notifications_enabled') === 'true') {
        const statusElement = document.getElementById('notificationStatus');
        if (statusElement) {
            statusElement.textContent = '✅ Daily notifications are enabled!';
        }
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('memoryModal');
    if (event.target === modal) {
        closeMemoryModal();
    }
};

// Handle chat input enter key
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.id === 'chatInput') {
        sendMessage();
    }
});
