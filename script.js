document.addEventListener("DOMContentLoaded", function () {
    const phChartCtx = document.getElementById("phChart").getContext("2d");
    const turbidityChartCtx = document.getElementById("turbidityChart").getContext("2d");
    const contaminationChartCtx = document.getElementById("contaminationChart").getContext("2d");
    const tableBody = document.getElementById("data-table-body");
    const citySelect = document.getElementById("city-select");
  
    let selectedCity = citySelect.value;
  
    // Update city on selection change
    citySelect.addEventListener("change", () => {
      selectedCity = citySelect.value;
      resetCharts();
      tableBody.innerHTML = ""; // Clear the table for new city data
    });
  
    const phRange = document.getElementById("ph-range");
    const turbidityRange = document.getElementById("turbidity-range");
    const contaminationRange = document.getElementById("contamination-range");
  
    // Update range values dynamically
    phRange.addEventListener("input", () => updateRangeValue("ph-value", phRange.value));
    turbidityRange.addEventListener("input", () => updateRangeValue("turbidity-value", turbidityRange.value));
    contaminationRange.addEventListener("input", () => updateRangeValue("contamination-value", contaminationRange.value));
  
    function updateRangeValue(id, value) {
      document.getElementById(id).textContent = value;
    }
  
    // Generate random data for simulation
    function generateRandomData() {
      return {
        pH: (Math.random() * 3 + 6).toFixed(2), // Random pH between 6 and 9
        turbidity: (Math.random() * 100).toFixed(2), // Random turbidity between 0 and 100
        contamination: (Math.random() * 50).toFixed(2), // Random contamination between 0 and 50
      };
    }
  
    // Update table
    function updateTable(data) {
      const now = new Date().toLocaleTimeString();
      const row = `<tr>
        <td>${now}</td>
        <td>${selectedCity}</td>
        <td>${data.pH}</td>
        <td>${data.turbidity}</td>
        <td>${data.contamination}</td>
      </tr>`;
      tableBody.insertAdjacentHTML("afterbegin", row);
    }
  
    // Update charts
    function updateChart(chart, label, data) {
      chart.data.labels.push(label);
      chart.data.datasets[0].data.push(data);
      if (chart.data.labels.length > 10) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
      }
      chart.update();
    }
  
    // Reset charts for a new city
    function resetCharts() {
      phChart.data.labels = [];
      phChart.data.datasets[0].data = [];
      phChart.update();
  
      turbidityChart.data.labels = [];
      turbidityChart.data.datasets[0].data = [];
      turbidityChart.update();
  
      contaminationChart.data.labels = [];
      contaminationChart.data.datasets[0].data = [];
      contaminationChart.update();
    }
  
    // Initialize Charts
    const phChart = new Chart(phChartCtx, {
      type: "line",
      data: {
        labels: [],
        datasets: [{
          label: "pH Levels",
          data: [],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        }],
      },
      options: { responsive: true },
    });
  
    const turbidityChart = new Chart(turbidityChartCtx, {
      type: "line",
      data: {
        labels: [],
        datasets: [{
          label: "Turbidity",
          data: [],
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 2,
          fill: false,
        }],
      },
      options: { responsive: true },
    });
  
    const contaminationChart = new Chart(contaminationChartCtx, {
      type: "line",
      data: {
        labels: [],
        datasets: [{
          label: "Contamination",
          data: [],
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          fill: false,
        }],
      },
      options: { responsive: true },
    });
  
    // Real-time data simulation
    function fetchData() {
      const data = generateRandomData();
      const now = new Date().toLocaleTimeString();
  
      updateTable(data);
      updateChart(phChart, now, data.pH);
      updateChart(turbidityChart, now, data.turbidity);
      updateChart(contaminationChart, now, data.contamination);
    }
  
    setInterval(fetchData, 5000); // Fetch new data every 5 seconds
  });
  