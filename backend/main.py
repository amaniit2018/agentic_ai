from fastapi import FastAPI, Request
from pydantic import BaseModel
from langchain.prompts import PromptTemplate
from langchain_ollama import OllamaLLM
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


class Query(BaseModel):
    question: str


llm = OllamaLLM(model="deepseek-coder:1.3b",temperature=0.3,num_predict=128)


prompt = PromptTemplate(
    input_variables=["question"],
    template="You are an expert AI assistant.\n\nQuestion: {question}\nAnswer:"
)

chain = prompt | llm

@app.post("/query")
async def query(request: Request):
    body = await request.json()
    question = body.get("question")

    try:
        response = chain.invoke({"question": question})
        print("Response:", response)  
        if isinstance(response, str):  
            return {"answer": response} 
        else:
            answer = response.get("text", "No response text found")  
            return {"answer": answer}
    except Exception as e:
        return {"error": str(e)}  

   


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)
