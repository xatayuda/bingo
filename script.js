let availableNumbers = [];
        let calledNumbers = [];
        let maxNumber = 100;
        let autoInterval = null;

        const display = document.getElementById('display');
        const callButton = document.getElementById('callButton');
        const resetButton = document.getElementById('resetButton');
        const bingo90Button = document.getElementById('bingo90Button');
        const bingo100Button = document.getElementById('bingo100Button');
        const autoButton = document.getElementById('autoButton');
        const calledNumbersDiv = document.getElementById('calledNumbers');
        const numberTable = document.getElementById('numberTable');

        // Inicializar juego
        function initGame(max) {
            maxNumber = max;
            availableNumbers = Array.from({length: maxNumber}, (_, i) => i + 1);
            calledNumbers = [];
            display.textContent = '?';
            callButton.disabled = false;
            callButton.textContent = 'Llamar próxima bola';
            autoButton.textContent = 'Automático - 5seg';
            autoButton.classList.remove('active');
            if (autoInterval) clearInterval(autoInterval);
            updateCalledNumbers();
            createNumberTable();
        }

        // Crear tabla de números
        function createNumberTable() {
            numberTable.innerHTML = '';
            for (let i = 1; i <= maxNumber; i++) {
                const cell = document.createElement('div');
                cell.className = 'number-cell';
                cell.textContent = i;
                cell.id = `number-${i}`;
                numberTable.appendChild(cell);
            }
        }

        // Obtener número aleatorio
        function getRandomNumber() {
            if (availableNumbers.length === 0) return null;
            const randomIndex = Math.floor(Math.random() * availableNumbers.length);
            const number = availableNumbers[randomIndex];
            availableNumbers.splice(randomIndex, 1);
            return number;
        }

        // Actualizar pantalla
        function updateDisplay(number) {
            display.textContent = number !== null ? number : 'Fin';
            if (number !== null) {
                calledNumbers.push(number);
                updateCalledNumbers();
                markNumber(number);
            } else {
                callButton.disabled = true;
                callButton.textContent = 'Juego Terminado';
                autoButton.textContent = 'Automático - 5seg';
                autoButton.classList.remove('active');
                if (autoInterval) clearInterval(autoInterval);
            }
        }

        function unlockProfile() {
            var pin = document.getElementById("pin-input").value;
            if (pin === "250604") {
                document.getElementById("lock-screen").style.display = "none";}}

        // Marcar número en la tabla
        function markNumber(number) {
            const cell = document.getElementById(`number-${number}`);
            if (cell) cell.classList.add('called');
        }

        // Actualizar números llamados
        function updateCalledNumbers() {
            const numbersText = calledNumbers.join(', ');
            calledNumbersDiv.innerHTML = `<p>Números llamados: ${numbersText}</p>`;
        }

        // Llamar número automáticamente
        function callNextNumber() {
            const nextNumber = getRandomNumber();
            updateDisplay(nextNumber);
        }

        // Eventos de botones
        callButton.addEventListener('click', () => {
            callNextNumber();
        });

        resetButton.addEventListener('click', () => {
            initGame(maxNumber);
        });

        bingo90Button.addEventListener('click', () => {
            initGame(90);
        });

        bingo100Button.addEventListener('click', () => {
            initGame(100);
        });

        autoButton.addEventListener('click', () => {
            if (autoInterval) {
                clearInterval(autoInterval);
                autoInterval = null;
                autoButton.textContent = 'Automático - 5seg';
                autoButton.classList.remove('active');
            } else {
                autoInterval = setInterval(callNextNumber, 5000); // 5 segundos
                autoButton.textContent = 'Detener';
                autoButton.classList.add('active');
            }
        });

        // Iniciar juego por defecto con 100 números
        initGame(100);