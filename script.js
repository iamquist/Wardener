        // DOM Elements
        const cpuTempElement = document.getElementById('cpuTemp');
        const cpuUsageElement = document.getElementById('cpuUsage');
        const memoryUsageElement = document.getElementById('memoryUsage');
        const tempProgressElement = document.getElementById('tempProgress');
        const usageProgressElement = document.getElementById('usageProgress');
        const memoryProgressElement = document.getElementById('memoryProgress');
        const notificationElement = document.getElementById('notification');
        const waterBtn = document.getElementById('waterBtn');
        const coolDownBtn = document.getElementById('coolDownBtn');
        const coolDownGame = document.getElementById('coolDownGame');
        const appList = document.getElementById('appList');
        const waterAnimation = document.getElementById('waterAnimation');
        const plant = document.querySelector('.plant');
        const stem = document.querySelector('.stem');
        const flower = document.querySelector('.flower');


        // Plant health state
        let plantHealth = 100;
        let isFlowering = false;

        // Mock data for simulation (in a real app, you'd get this from system APIs)
        function getSystemStats() {
            return {
                cpuTemp: Math.min(100, 30 + Math.random() * 70), // 30-100°C
                cpuUsage: Math.random() * 100, // 0-100%
                memoryUsage: 30 + Math.random() * 70 // 30-100%
            };
        }


        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeToggle.textContent = document.body.classList.contains('light-mode') 
            ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
        
        
        let growthStage = 0;
        const growthThresholds = [20, 50, 80];

        function checkGrowthStage() {
            const newStage = growthThresholds.findIndex(threshold => plantHealth >= threshold) + 1;
            if (newStage > growthStage) {
                growthStage = newStage;
                showGrowthAnimation();
            }
        }
        // Add day/night effects
        function updateTimeOfDay() {
            const hour = new Date().getHours();
            const isDay = hour > 6 && hour < 20;
            document.body.classList.toggle('night-mode', !isDay);
                if (!isDay) plantHealth += 2; // Plants "rest" at night
        }

            setInterval(updateTimeOfDay, 60000);
            function applySeasonalTheme() {
                const now = new Date();
                const month = now.getMonth();
    
                if (month === 11) { // December
                    document.body.classList.add('winter-theme');
                }   
                // Other seasons...
            }
            
            // Unlock new plant types as achievements
            const evolutionTree = {
                seedling: { req: "7 days of care" },
                mature: { req: "CPU < 60°C for 24h" },
                legendary: { req: "100% health for 1 week" }
            };

            function checkEvolution() {
                if (daysHealthy >= 7) unlockPlant("Legendary Oak");
            }

            function saveGameState() {
                const gameState = {
                    plantHealth,
                    growthStage,
                    achievements: [],
                    // other state
                };
                localStorage.setItem('wardenerState', JSON.stringify(gameState));
            }

            arBtn.addEventListener('click', () => {
                if (navigator.xr) {
                    // Launch WebXR session
                }
            });

            function getHealthTip() {
                const tips = {
                    highTemp: "Close Chrome tabs to reduce CPU load",
                    highMemory: "Restart Slack to free up RAM"
                };
                    return tips[getBiggestIssue()];
            }

            function loadGameState() {
                const savedState = localStorage.getItem('wardenerState');
                    if (savedState) {
                        const state = JSON.parse(savedState);
                            plantHealth = state.plantHealth;
                            // restore other state
                    }
            }
            
            // Randomized plant traits
           class PlantDNA {
                constructor() {
                    // Physical traits
                    this.leafSize = 0.8 + Math.random() * 1.2; // 0.8-2.0
                    this.growthSpeed = 0.8 + Math.random() * 0.4;
                    this.maxHeight = 100 + Math.random() * 50; // 100-150px
                    this.leafColor = this.generateLeafColor();
                    this.stemColor = this.generateStemColor();
                    
                    // Environmental preferences
                    this.idealTemp = 50 + Math.random() * 20; // 50-70°C
                    this.tempTolerance = 10 + Math.random() * 20; // 10-30°C range
                }
                
                generateLeafColor() {
                    const hue = 80 + Math.random() * 40; // Green hues (80-120)
                    return `hsl(${hue}, 70%, 50%)`;
                }
                
                generateStemColor() {
                    return `hsl(30, ${60 + Math.random() * 20}%, ${30 + Math.random() * 20}%)`;
                }
                
                // Calculate health impact based on system conditions
                calculateHealthImpact(currentTemp) {
                    const tempDiff = Math.abs(currentTemp - this.idealTemp);
                    if (tempDiff < this.tempTolerance) {
                        return this.growthSpeed; // Positive growth
                    }
                    return -((tempDiff - this.tempTolerance) / 10); // Negative impact
                }
            }

            function showGrowthAnimation() {
            // Add growth animation logic
            }

            function showNotification(message, type = 'info') {
                const notification = document.createElement('div');
                notification.className = `notification ${type}`;
                notification.textContent = message;
                document.body.appendChild(notification);
    
                setTimeout(() => {
                notification.remove();
                }, 3000);
            }

            // Update plant appearance based on health
            function updatePlant() {
            // Adjust plant height (health)
            const plantHeight = 70 + (plantHealth / 100 * 30);
            stem.style.height = `${plantHeight}px`;
            
            // Adjust leaf positions based on height
            document.querySelector('.leaf-1').style.top = `${plantHeight * 0.3}px`;
            document.querySelector('.leaf-2').style.top = `${plantHeight * 0.5}px`;
            document.querySelector('.leaf-3').style.top = `${plantHeight * 0.7}px`;
            
            // Change color based on health
            if (plantHealth < 30) {
                stem.style.backgroundColor = '#8BC34A';
                document.querySelectorAll('.leaf').forEach(leaf => {
                    leaf.style.backgroundColor = '#689F38';
                });
                flower.style.display = 'none';
                isFlowering = false;
            } else if (plantHealth > 70 && !isFlowering) {
                // Only show flower if health is good and not already flowering
                flower.style.display = 'block';
                isFlowering = true;
            }
        }


        
            
        // Rain when CPU is overloaded
        function updateWeather() {
            const weather = document.getElementById('weather-effects');
                if (cpuUsage > 90) {
                    weather.innerHTML = '<div class="rain"></div>';
                }
        }
        
        // Create water drop animation
        function createWaterDrops() {
            document.getElementById('waterSound').play();
            waterAnimation.style.display = 'block';
            waterAnimation.innerHTML = '';
            
            for (let i = 0; i < 20; i++) {
                const drop = document.createElement('div');
                drop.className = 'water-drop';
                drop.style.left = `${10 + Math.random() * 80}%`;
                drop.style.animationDelay = `${Math.random() * 0.5}s`;
                waterAnimation.appendChild(drop);
            }
            
            setTimeout(() => {
                waterAnimation.style.display = 'none';
            }, 1500);
        }

        // Water plant action
        waterBtn.addEventListener('click', () => {
            if (plantHealth < 100) {
                plantHealth = Math.min(100, plantHealth + 10);
                updatePlant();
                createWaterDrops();
            }
        });
        // Cool down action
        coolDownBtn.addEventListener('click', () => {
    // Show dialog overlay
    coolDownDialog.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Populate with mock apps
    appList.innerHTML = '';
    const apps = ['Chrome (5 tabs)', 'Discord', 'Spotify', 'Steam', 'Zoom', 'Photoshop'];
    const resourceUsage = [45, 30, 20, 35, 25, 40];
    
    apps.forEach((app, index) => {
        const appItem = document.createElement('div');
        appItem.className = 'app-item';
        appItem.innerHTML = `
            <span>${app} - ${resourceUsage[index]}% CPU</span>
            <button class="close-btn">Close</button>
        `;
        appList.appendChild(appItem);
        
        // Add click handler to close buttons
        const closeBtn = appItem.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            appItem.remove();
            // Simulate temperature drop when closing apps
            const currentTemp = parseFloat(cpuTempElement.textContent);
            const newTemp = Math.max(30, currentTemp - (resourceUsage[index] * 0.2));
            cpuTempElement.textContent = `${newTemp.toFixed(1)}°C`;
            updateTemperatureColor(newTemp);
            tempProgressElement.style.width = `${newTemp}%`;
            
            // Check if all apps are closed
            if (appList.children.length === 0) {
                closeDialog();
            }
        });
    });
});
 

// Close dialog when clicking outside
coolDownDialog.addEventListener('click', (e) => {
    if (e.target === coolDownDialog) {
        closeDialog();
    }
});
document.querySelector('.dialog-close-btn').addEventListener('click', closeDialog);

function closeDialog() {
    coolDownDialog.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}
        // Update temperature color based on value
        function updateTemperatureColor(temp) {
            if (temp > 80) {
                cpuTempElement.className = 'stat-value temp-danger';
                notificationElement.style.display = 'block';
            } else if (temp > 65) {
                cpuTempElement.className = 'stat-value temp-warning';
                notificationElement.style.display = 'none';
            } else {
                cpuTempElement.className = 'stat-value temp-value';
                notificationElement.style.display = 'none';
            }
        }

        // Update plant health based on temperature
        function updatePlantHealth(temp) {
            if (temp > 80) {
                plantHealth = Math.max(0, plantHealth - 5);
            } else if (temp > 65) {
                plantHealth = Math.max(0, plantHealth - 2);
            } else if (temp < 50) {
                plantHealth = Math.min(100, plantHealth + 1);
            }
            updatePlant();

            // Add to updatePlant()
            if (cpuTemp > 85 && Math.random() > 0.7) {
                addDisease("Overheating Blight");
            }

            function addDisease(name) {
                const diseaseElement = document.createElement('div');
                diseaseElement.className = 'disease';
                diseaseElement.textContent = `⚠️ ${name}`;
                plantContainer.appendChild(diseaseElement);
                plantHealth -= 15;
            }
        }

        // Main update function
        function updateStats() {
            const stats = getSystemStats();
            
            // Update CPU temperature
            cpuTempElement.textContent = `${stats.cpuTemp.toFixed(1)}°C`;
            updateTemperatureColor(stats.cpuTemp);
            tempProgressElement.style.width = `${stats.cpuTemp}%`;
            
            // Update CPU usage
            cpuUsageElement.textContent = `${stats.cpuUsage.toFixed(1)}%`;
            usageProgressElement.style.width = `${stats.cpuUsage}%`;
            
            // Update memory usage
            memoryUsageElement.textContent = `${stats.memoryUsage.toFixed(1)}%`;
            memoryProgressElement.style.width = `${stats.memoryUsage}%`;
            
            // Update plant health based on temperature
            updatePlantHealth(stats.cpuTemp);
        }
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('tempChart').getContext('2d');
    
    // Example chart initialization (requires Chart.js library)
    const tempChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Performance',
                data: [65, 59, 80, 81, 56, 72],
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'var(--text)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'var(--text)'
                    }
                }
            }
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const achievementsList = document.getElementById('achievementsList');
    const achievements = [
        { name: "First Plant", unlocked: true },
        { name: "Green Thumb", unlocked: true },
        { name: "Plant Collector", unlocked: false },
        { name: "Perfect Care", unlocked: false }
    ];

    achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.className = `achievement ${achievement.unlocked ? '' : 'locked'}`;
        
        achievementElement.innerHTML = `
            <div class="achievement-icon">${achievement.unlocked ? '✓' : '?'}</div>
            <div>${achievement.name}</div>
        `;
        
        achievementsList.appendChild(achievementElement);
    });

    // AR button functionality
    const arBtn = document.getElementById('arBtn');
    arBtn.addEventListener('click', function() {
        alert('AR view would open here in a real implementation');
        // In a real app, this would launch WebXR or similar AR experience
    });
});

        // Initialize
        updateStats();
        updatePlant();
        
        // Update stats every 3 seconds
        setInterval(updateStats, 3000);
    