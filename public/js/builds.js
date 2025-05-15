document.addEventListener("DOMContentLoaded", () => {
  const obrasList = document.getElementById("obrasList")
  const addObraForm = document.getElementById("addObraForm")

  const API_URL = "/api/builds"

  async function fetchObras() {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const obras = await response.json()

      obrasList.innerHTML = ""

      if (obras.length === 0) {
        obrasList.innerHTML =
          '<p class="text-gray-500">Nenhuma obra cadastrada.</p>'
        return
      }

      obras.forEach((obra) => {
        const obraElement = document.createElement("div")
        obraElement.className =
          "p-4 bg-white rounded-lg shadow-sm border border-gray-200"
        obraElement.innerHTML = `
                    <h3 class="text-x1 font-semibold text-blue-500">${
                      obra.name
                    }</h3>
                    <p class="text-gray-600">${
                      obra.description || "Sem descrição"
                    }</p>
                    <p class="text-sm text-gray-500">Status: ${
                      obra.status || "Não definido"
                    }</p>
                    <p class="text-sm text-gray-500">Início: ${
                      obra.startDate
                        ? new Date(obra.startDate).toLocaleDateString()
                        : "Não definido"
                    }</p>
                    <div class="mt-2">
                        <button onclick="deleteObra(${
                          obra.id
                        })" class="text-red-500 hover:text-red-700 text-sm mr-2">Excluir</button>
                        <!-- Add edit button/functionality here -->
                    </div>
                `
        obrasList.appendChild(obraElement)
      })
    } catch (error) {
      console.error("Erro ao buscar obras:", error)
      obrasList.innerHTML =
        '<p class="text-red-500">Erro ao carregar obras.</p>'
    }
  }

  addObraForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const formData = new FormData(addObraForm)
    const obraData = Object.fromEntries(formData.entries())

    if (!obraData.startDate) delete obraData.startDate

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obraData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        )
      }

      addObraForm.reset()
      fetchObras()
    } catch (error) {
      console.error("Erro ao adicionar obra:", error)
      alert(`Erro ao adicionar obra: ${error.message}`)
    }
  })

  window.deleteObra = async (id) => {
    if (!confirm("Tem certeza que deseja excluir esta obra?")) {
      return
    }
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        )
      }
      fetchObras()
    } catch (error) {
      console.error("Erro ao excluir obra:", error)
      alert(`Erro ao excluir obra: ${error.message}`)
    }
  }

  fetchObras()
})
