// Authentication system
const AUTH_CONFIG = {
    username: 'leticia',
    password: 'nutri2024'
};

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    initializeLoginForm();
});

function checkAuthentication() {
    const isAuthenticated = localStorage.getItem('plan_nutricional_auth') === 'true';
    const loginOverlay = document.getElementById('loginOverlay');
    const logoutBtn = document.getElementById('logoutBtn');
    const mainContainer = document.querySelector('.container');
    
    if (!isAuthenticated) {
        // Show login overlay
        loginOverlay.style.display = 'flex';
        // Hide main content except header
        hideMainContent();
    } else {
        // Hide login overlay
        loginOverlay.style.display = 'none';
        // Show logout button
        logoutBtn.style.display = 'block';
        // Show main content
        showMainContent();
        // Initialize the meal plan display
        generateCalendar();
    }
}

function hideMainContent() {
    const mainSections = ['.tabs', '#calendar', '#alternatives', '#stats', '#portions', '.fab'];
    mainSections.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = 'none';
        }
    });
    document.getElementById('logoutBtn').style.display = 'none';
}

function showMainContent() {
    const mainSections = ['.tabs', '#calendar', '.fab'];
    mainSections.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = '';
        }
    });
    // Show the active tab content
    const activeSection = document.querySelector('.content-section.active');
    if (activeSection) {
        activeSection.style.display = 'block';
    }
}

function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    // Hide previous error
    errorDiv.style.display = 'none';
    
    // Validate credentials
    if (username === AUTH_CONFIG.username && password === AUTH_CONFIG.password) {
        // Set authentication status
        localStorage.setItem('plan_nutricional_auth', 'true');
        
        // Hide login overlay with animation
        const loginOverlay = document.getElementById('loginOverlay');
        loginOverlay.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            checkAuthentication();
        }, 300);
        
    } else {
        // Show error message
        errorDiv.style.display = 'block';
        
        // Clear password field
        document.getElementById('password').value = '';
        
        // Add shake animation
        const loginModal = document.querySelector('.login-modal');
        loginModal.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            loginModal.style.animation = '';
        }, 500);
    }
}

function logout() {
    // Clear authentication status
    localStorage.removeItem('plan_nutricional_auth');
    
    // Clear form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
    // Check authentication (will show login)
    checkAuthentication();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Meal plan data
const mealPlan = {
    lunes: {
        desayuno: {
            descripcion: "Omelette con queso mozzarella y champiñones",
            detalles: "2 huevos + 1 clara, queso mozzarella, champiñones, tomate, chile dulce, 1/2 aguacate, 1 tostada integral, fruta",
            macros: { carbs: 35, protein: 28, fats: 15 }
        },
        almuerzo: {
            descripcion: "Pollo a la plancha con arroz y ensalada",
            detalles: "100g pechuga de pollo, 1/4 taza arroz blanco, 1 taza ensalada mixta",
            macros: { carbs: 30, protein: 35, fats: 8 }
        },
        cena: {
            descripcion: "Filete de pescado con yuca y vegetales",
            detalles: "100g pescado blanco, 1/3 taza yuca, 1 taza vegetales cocidos",
            macros: { carbs: 35, protein: 30, fats: 10 }
        },
        refrigerios: {
            descripcion: "Frutos secos",
            detalles: "10 almendras o 18 pistachos o 30g marañón (2 veces al día)",
            macros: { carbs: 10, protein: 12, fats: 20 }
        }
    },
    martes: {
        desayuno: {
            descripcion: "Omelette de jamón y queso",
            detalles: "2 huevos + 2 claras, jamón de pavo, queso americano, 1/2 aguacate, fruta, yogurt",
            macros: { carbs: 30, protein: 35, fats: 14 }
        },
        almuerzo: {
            descripcion: "Pescado al horno con puré y vegetales",
            detalles: "100g tilapia, 1/3 taza puré de papa, brócoli y zanahorias al vapor",
            macros: { carbs: 32, protein: 32, fats: 8 }
        },
        cena: {
            descripcion: "Pimentón relleno de carne",
            detalles: "75g carne molida magra, pimentón, queso cheddar, ensalada mixta",
            macros: { carbs: 25, protein: 28, fats: 12 }
        },
        refrigerios: {
            descripcion: "Frutos secos",
            detalles: "10 almendras o 18 pistachos o 30g marañón (2 veces al día)",
            macros: { carbs: 10, protein: 12, fats: 20 }
        }
    },
    miercoles: {
        desayuno: {
            descripcion: "Pancakes de avena",
            detalles: "1/2 taza avena, 1 huevo, 1/2 banano, yogurt natural, fruta",
            macros: { carbs: 45, protein: 20, fats: 10 }
        },
        almuerzo: {
            descripcion: "Ensalada tibia de lentejas con huevo",
            detalles: "1/2 taza lentejas, 2 huevos duros, hojas verdes, aceite de oliva",
            macros: { carbs: 35, protein: 25, fats: 12 }
        },
        cena: {
            descripcion: "Bowl Keto con quinoa",
            detalles: "Pepino, tomate, cebolla, quinoa, frijoles rojos, aceite de oliva",
            macros: { carbs: 40, protein: 18, fats: 14 }
        },
        refrigerios: {
            descripcion: "Frutos secos",
            detalles: "10 almendras o 18 pistachos o 30g marañón (2 veces al día)",
            macros: { carbs: 10, protein: 12, fats: 20 }
        }
    },
    jueves: {
        desayuno: {
            descripcion: "Huevos revueltos con queso y champiñones",
            detalles: "2 huevos + 2 claras, queso cheddar, champiñones, fruta, yogurt",
            macros: { carbs: 32, protein: 32, fats: 14 }
        },
        almuerzo: {
            descripcion: "Tacos de carne con guacamole",
            detalles: "80g carne molida, 2 tortillas maíz, repollo, guacamole",
            macros: { carbs: 35, protein: 28, fats: 15 }
        },
        cena: {
            descripcion: "Pollo asado con ensalada griega",
            detalles: "1/2 pechuga pollo, espinacas, tomates, aceitunas, queso feta",
            macros: { carbs: 20, protein: 35, fats: 18 }
        },
        refrigerios: {
            descripcion: "Frutos secos",
            detalles: "10 almendras o 18 pistachos o 30g marañón (2 veces al día)",
            macros: { carbs: 10, protein: 12, fats: 20 }
        }
    },
    viernes: {
        desayuno: {
            descripcion: "Desayuno bajo en carbohidratos",
            detalles: "2 huevos estrellados, espinaca, tomate, margarina con ajo, fruta, yogurt",
            macros: { carbs: 25, protein: 20, fats: 16 }
        },
        almuerzo: {
            descripcion: "Carne molida con papa y ensalada",
            detalles: "90g carne molida, 1/2 taza papa, ensalada verde, aceite de oliva",
            macros: { carbs: 35, protein: 32, fats: 12 }
        },
        cena: {
            descripcion: "Tortillas con queso y jamón",
            detalles: "2 tortillas maíz, queso mozzarella, jamón pavo, 1 huevo, aguacate",
            macros: { carbs: 40, protein: 30, fats: 16 }
        },
        refrigerios: {
            descripcion: "Frutos secos",
            detalles: "10 almendras o 18 pistachos o 30g marañón (2 veces al día)",
            macros: { carbs: 10, protein: 12, fats: 20 }
        }
    },
    sabado: {
        desayuno: {
            descripcion: "Huevos a la ranchera",
            detalles: "2 huevos, espinaca, queso cheddar, sofrito, tostada, fruta",
            macros: { carbs: 35, protein: 25, fats: 15 }
        },
        almuerzo: {
            descripcion: "Almuerzo libre (elección)",
            detalles: "Selecciona cualquier almuerzo de la semana",
            macros: { carbs: 35, protein: 32, fats: 12 }
        },
        cena: {
            descripcion: "Atún con chismol",
            detalles: "1 lata atún, chismol, mayonesa aguacate, galletas Sanísimo",
            macros: { carbs: 30, protein: 25, fats: 12 }
        },
        refrigerios: {
            descripcion: "Frutos secos",
            detalles: "10 almendras o 18 pistachos o 30g marañón (2 veces al día)",
            macros: { carbs: 10, protein: 12, fats: 20 }
        }
    },
    domingo: {
        desayuno: {
            descripcion: "Desayuno libre",
            detalles: "Selecciona cualquier desayuno de la semana",
            macros: { carbs: 35, protein: 28, fats: 15 }
        },
        almuerzo: {
            descripcion: "Almuerzo libre",
            detalles: "Selecciona cualquier almuerzo de la semana",
            macros: { carbs: 35, protein: 32, fats: 12 }
        },
        cena: {
            descripcion: "Ensalada de frutas con yogurt",
            detalles: "1 taza frutas mixtas, 1/2 taza yogurt, granola, coco rallado",
            macros: { carbs: 45, protein: 15, fats: 12 }
        },
        refrigerios: {
            descripcion: "OMITIR si hubo Cheat Meal",
            detalles: "Si consumió alcohol, evite carbohidratos",
            macros: { carbs: 0, protein: 0, fats: 0 }
        }
    }
};

// Days of week
const daysOfWeek = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
const dayNames = {
    lunes: 'Lunes',
    martes: 'Martes',
    miercoles: 'Miércoles',
    jueves: 'Jueves',
    viernes: 'Viernes',
    sabado: 'Sábado',
    domingo: 'Domingo'
};

// Initialize calendar
function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;
    
    calendarGrid.innerHTML = '';

    daysOfWeek.forEach(day => {
        const dayData = mealPlan[day];
        const totalMacros = calculateDayMacros(dayData);
        
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.innerHTML = `
            <div class="day-header">
                <div class="day-name">${dayNames[day]}</div>
                <div class="day-calories">${Math.round(totalMacros.calories)} kcal</div>
            </div>
            ${createMealCard('Desayuno', '7:00 AM', dayData.desayuno)}
            ${createMealCard('Refrigerio AM', '10:00 AM', dayData.refrigerios)}
            ${createMealCard('Almuerzo', '12:30 PM', dayData.almuerzo)}
            ${createMealCard('Refrigerio PM', '3:30 PM', dayData.refrigerios)}
            ${createMealCard('Cena', '6:30 PM', dayData.cena)}
        `;
        calendarGrid.appendChild(dayCard);
    });
}

function createMealCard(type, time, mealData) {
    return `
        <div class="meal-card" onclick="showMealDetails('${type}', ${JSON.stringify(mealData).replace(/"/g, '&quot;')})">
            <div class="meal-header">
                <div class="meal-type">${type}</div>
                <div class="meal-time">${time}</div>
            </div>
            <div class="meal-description">${mealData.descripcion}</div>
            <div class="macros">
                <div class="macro-item macro-carbs">${mealData.macros.carbs}g C</div>
                <div class="macro-item macro-protein">${mealData.macros.protein}g P</div>
                <div class="macro-item macro-fats">${mealData.macros.fats}g G</div>
            </div>
        </div>
    `;
}

function calculateDayMacros(dayData) {
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFats = 0;

    Object.values(dayData).forEach(meal => {
        totalCarbs += meal.macros.carbs;
        totalProtein += meal.macros.protein;
        totalFats += meal.macros.fats;
    });

    const calories = (totalCarbs * 4) + (totalProtein * 4) + (totalFats * 9);
    
    return {
        carbs: totalCarbs,
        protein: totalProtein,
        fats: totalFats,
        calories: calories
    };
}

function showMealDetails(type, mealData) {
    const modal = document.getElementById('mealModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = type;
    modalBody.innerHTML = `
        <h3>${mealData.descripcion}</h3>
        <p style="margin: 15px 0; color: var(--text-dark); line-height: 1.6;">${mealData.detalles}</p>
        <div class="macros" style="margin-top: 20px;">
            <div class="macro-item macro-carbs">${mealData.macros.carbs}g Carbohidratos</div>
            <div class="macro-item macro-protein">${mealData.macros.protein}g Proteínas</div>
            <div class="macro-item macro-fats">${mealData.macros.fats}g Grasas</div>
        </div>
        <p style="margin-top: 15px; text-align: center; color: var(--text-light);">
            Total: ${(mealData.macros.carbs * 4) + (mealData.macros.protein * 4) + (mealData.macros.fats * 9)} kcal
        </p>
    `;

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('mealModal').style.display = 'none';
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Add active class to clicked tab
    event.target.classList.add('active');
}

function showTips() {
    const tips = [
        "💧 Recuerda tomar al menos 8 vasos de agua al día",
        "🥗 Prepara tus comidas con anticipación para mantener el plan",
        "🏃‍♀️ Combina tu plan con 150 minutos de actividad física semanal",
        "😴 Duerme entre 7-8 horas para optimizar tu metabolismo",
        "📝 Lleva un registro de cómo te sientes con cada comida"
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    alert(randomTip);
}

// Initialize on load - now handled by authentication system
// The generateCalendar() function is called from checkAuthentication() after login

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('mealModal');
    if (event.target == modal) {
        closeModal();
    }
}