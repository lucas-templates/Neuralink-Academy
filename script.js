// Brain Activity Visualization
class BrainVisualization {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.animationId = null;
        this.isAnimating = false;
        
        this.setupCanvas();
        this.createNeuralNetwork();
        this.animate();
    }
    
    setupCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = 400;
        
        window.addEventListener('resize', () => {
            this.canvas.width = container.clientWidth;
            this.canvas.height = 400;
            this.createNeuralNetwork();
        });
    }
    
    createNeuralNetwork() {
        this.nodes = [];
        this.connections = [];
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(this.canvas.width, this.canvas.height) * 0.3;
        
        // Create central nodes
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            this.nodes.push({
                x: x,
                y: y,
                radius: 5 + Math.random() * 3,
                pulse: Math.random() * Math.PI * 2,
                speed: 0.02 + Math.random() * 0.02,
                activity: Math.random()
            });
        }
        
        // Create connections
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                if (Math.random() > 0.6) {
                    this.connections.push({
                        from: i,
                        to: j,
                        strength: Math.random(),
                        pulse: Math.random() * Math.PI * 2
                    });
                }
            }
        }
    }
    
    draw() {
        // Clear canvas with semi-transparent background for trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.connections.forEach(conn => {
            const fromNode = this.nodes[conn.from];
            const toNode = this.nodes[conn.to];
            
            const pulse = Math.sin(conn.pulse) * 0.5 + 0.5;
            conn.pulse += 0.05;
            
            const alpha = (conn.strength * pulse * 0.3);
            this.ctx.strokeStyle = `rgba(41, 121, 255, ${alpha})`;
            this.ctx.lineWidth = 1 + pulse * 2;
            this.ctx.beginPath();
            this.ctx.moveTo(fromNode.x, fromNode.y);
            this.ctx.lineTo(toNode.x, toNode.y);
            this.ctx.stroke();
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            node.pulse += node.speed;
            const pulse = Math.sin(node.pulse) * 0.5 + 0.5;
            node.activity = pulse;
            
            // Outer glow
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius * 3
            );
            gradient.addColorStop(0, `rgba(255, 214, 0, ${pulse * 0.8})`);
            gradient.addColorStop(1, 'rgba(255, 214, 0, 0)');
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Node core
            this.ctx.fillStyle = `rgba(41, 121, 255, ${0.8 + pulse * 0.2})`;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Update metrics
        this.updateMetrics();
    }
    
    updateMetrics() {
        const avgActivity = this.nodes.reduce((sum, node) => sum + node.activity, 0) / this.nodes.length;
        const focusLevel = Math.round(avgActivity * 100);
        const memoryLevel = Math.round((Math.sin(Date.now() / 2000) * 0.5 + 0.5) * 100);
        const cognitiveLoad = Math.round((1 - avgActivity * 0.7) * 100);
        
        document.getElementById('focusLevel').textContent = focusLevel + '%';
        document.getElementById('memoryLevel').textContent = memoryLevel + '%';
        document.getElementById('cognitiveLoad').textContent = cognitiveLoad + '%';
    }
    
    animate() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            const loop = () => {
                this.draw();
                this.animationId = requestAnimationFrame(loop);
            };
            loop();
        }
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.isAnimating = false;
        }
    }
}

// Learning Path Generator
class LearningPathGenerator {
    constructor() {
        this.paths = {
            'machine learning': {
                beginner: [
                    { title: 'Introduction to Python', desc: 'Master the fundamentals of Python programming', duration: '2 weeks' },
                    { title: 'Mathematics for ML', desc: 'Linear algebra, calculus, and statistics basics', duration: '3 weeks' },
                    { title: 'Data Manipulation', desc: 'Learn NumPy, Pandas, and data preprocessing', duration: '2 weeks' },
                    { title: 'First ML Models', desc: 'Build your first regression and classification models', duration: '3 weeks' }
                ],
                intermediate: [
                    { title: 'Advanced Algorithms', desc: 'Deep dive into neural networks and ensemble methods', duration: '4 weeks' },
                    { title: 'Deep Learning Basics', desc: 'Introduction to TensorFlow and PyTorch', duration: '3 weeks' },
                    { title: 'Model Optimization', desc: 'Hyperparameter tuning and model evaluation', duration: '2 weeks' }
                ],
                advanced: [
                    { title: 'Advanced Deep Learning', desc: 'CNNs, RNNs, and Transformers', duration: '5 weeks' },
                    { title: 'MLOps & Deployment', desc: 'Model deployment and production systems', duration: '3 weeks' },
                    { title: 'Research & Innovation', desc: 'Cutting-edge techniques and research papers', duration: 'Ongoing' }
                ]
            },
            'web development': {
                beginner: [
                    { title: 'HTML & CSS Fundamentals', desc: 'Build beautiful, responsive web pages', duration: '2 weeks' },
                    { title: 'JavaScript Basics', desc: 'Learn programming fundamentals with JavaScript', duration: '3 weeks' },
                    { title: 'DOM Manipulation', desc: 'Interactive web pages with JavaScript', duration: '2 weeks' },
                    { title: 'First Web Project', desc: 'Build your first complete website', duration: '2 weeks' }
                ],
                intermediate: [
                    { title: 'Frontend Frameworks', desc: 'React, Vue, or Angular fundamentals', duration: '4 weeks' },
                    { title: 'Backend Development', desc: 'Node.js, Express, and REST APIs', duration: '3 weeks' },
                    { title: 'Database Integration', desc: 'SQL and NoSQL databases', duration: '2 weeks' }
                ],
                advanced: [
                    { title: 'Full-Stack Architecture', desc: 'Advanced patterns and best practices', duration: '4 weeks' },
                    { title: 'DevOps & Deployment', desc: 'CI/CD, Docker, and cloud deployment', duration: '3 weeks' },
                    { title: 'Performance Optimization', desc: 'Advanced optimization techniques', duration: '2 weeks' }
                ]
            },
            'data science': {
                beginner: [
                    { title: 'Python for Data Science', desc: 'Python fundamentals and data structures', duration: '2 weeks' },
                    { title: 'Data Analysis with Pandas', desc: 'Data manipulation and analysis', duration: '3 weeks' },
                    { title: 'Data Visualization', desc: 'Matplotlib, Seaborn, and Plotly', duration: '2 weeks' },
                    { title: 'Statistical Analysis', desc: 'Descriptive and inferential statistics', duration: '3 weeks' }
                ],
                intermediate: [
                    { title: 'Advanced Analytics', desc: 'Time series, clustering, and classification', duration: '4 weeks' },
                    { title: 'SQL Mastery', desc: 'Complex queries and database design', duration: '2 weeks' },
                    { title: 'Data Engineering', desc: 'ETL pipelines and data warehousing', duration: '3 weeks' }
                ],
                advanced: [
                    { title: 'Big Data Technologies', desc: 'Spark, Hadoop, and distributed computing', duration: '4 weeks' },
                    { title: 'Advanced ML for Data Science', desc: 'Predictive modeling and feature engineering', duration: '4 weeks' },
                    { title: 'Data Science at Scale', desc: 'Production systems and real-world applications', duration: 'Ongoing' }
                ]
            }
        };
    }
    
    generatePath(goal, level, style) {
        const goalLower = goal.toLowerCase();
        let pathKey = null;
        
        // Find matching path
        for (const key in this.paths) {
            if (goalLower.includes(key)) {
                pathKey = key;
                break;
            }
        }
        
        // Default path if no match
        if (!pathKey) {
            pathKey = 'machine learning';
        }
        
        const steps = this.paths[pathKey][level] || this.paths[pathKey]['beginner'];
        
        return {
            goal: goal,
            level: level,
            style: style,
            steps: steps
        };
    }
    
    renderPath(path) {
        const resultDiv = document.getElementById('pathResult');
        resultDiv.innerHTML = `
            <h3 style="color: var(--synaptic-white); margin-bottom: 20px;">
                Your Learning Path: ${path.goal}
            </h3>
            <p style="color: var(--synaptic-white); opacity: 0.8; margin-bottom: 25px;">
                Level: <span style="color: var(--focus-blue); text-transform: capitalize;">${path.level}</span> | 
                Style: <span style="color: var(--memory-gold); text-transform: capitalize;">${path.style}</span>
            </p>
            <ul class="path-steps">
                ${path.steps.map((step, index) => `
                    <li class="path-step">
                        <span class="path-step-number">${index + 1}</span>
                        <div>
                            <div class="path-step-title">${step.title}</div>
                            <div class="path-step-desc">${step.desc} • ${step.duration}</div>
                        </div>
                    </li>
                `).join('')}
            </ul>
        `;
    }
}

// Initialize
let brainViz;
let pathGenerator;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize brain visualization
    brainViz = new BrainVisualization('brainCanvas');
    
    // Initialize learning path generator
    pathGenerator = new LearningPathGenerator();
    
    // Demo button
    document.getElementById('startDemo').addEventListener('click', () => {
        const demoSection = document.getElementById('demo');
        if (demoSection) {
            demoSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Start learning button
    document.getElementById('startLearning').addEventListener('click', () => {
        alert('Welcome to Neuralink Academy! Your personalized learning journey begins now. 🧠✨');
    });
    
    // Watch video button
    document.getElementById('watchVideo').addEventListener('click', () => {
        alert('Demo video coming soon! Experience the future of learning. 🚀');
    });
    
    // Generate learning path
    document.getElementById('generatePath').addEventListener('click', () => {
        const goal = document.getElementById('learningGoal').value;
        const level = document.getElementById('currentLevel').value;
        const style = document.getElementById('learningStyle').value;
        
        if (!goal.trim()) {
            alert('Please enter what you want to learn!');
            return;
        }
        
        const path = pathGenerator.generatePath(goal, level, style);
        pathGenerator.renderPath(path);
        
        // Smooth scroll to result
        document.getElementById('pathResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

