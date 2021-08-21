window.onload = () => {
  const debug = true
  const useStickyVectors = true
  const getCenterVector = (v1,v2) => ({x: (v1.x + v2.x)/2 , y: (v1.y + v2.y)/2})
  const basicVectors = [
    { x: 400 , y: 50 },
    { x: 740 , y: 513 },
    { x: 160 , y: 500 },
     ]
  const focusedVector = { x: 0 , y: 0 }
  const speedOfCalculateMS = 50
  const genCanvas = function() {
    const body = (document.body || document.getElementByTagName("body"))
    this.node = document.createElement("canvas")
    this.node.width = body.offsetWidth - 2 // fix
    this.node.height = body.offsetHeight - 2 // fix
    this.ctx = this.node.getContext('2d')
    body.appendChild(this.node)
    if(useStickyVectors){
      basicVectors[0] = {x:this.node.width/2 ,y:50}
      basicVectors[1] = {x:this.node.width -52,y:this.node.height -52}
      basicVectors[2] = {x:50,y:this.node.height -52}
    }
  }
  genCanvas.prototype.setDot = async function({x,y}) {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(x,y,1,1);
  }
  
  const canvas = new genCanvas();
  basicVectors.forEach(vector => canvas.setDot(vector))
  
  const startCalculate = async function() {
     this.interval = setInterval(()=>{
       const id = Math.floor(Math.random() * basicVectors.length) // selected Id Of Basic Vector
       const newVector = getCenterVector(basicVectors[id],focusedVector)
       
       focusedVector.x = newVector.x
       focusedVector.y = newVector.y
       
       canvas.setDot(newVector)
       
       debug && console.log(`tick on x:${newVector.x},y:${newVector.y} rand(${id})`)
     },speedOfCalculateMS)
  }
  document.onclick = async e => {
    const vector = { x : e.offsetX , y : e.offsetY }
    focusedVector.x = vector.x
    focusedVector.y = vector.y
    console.log(`x:${vector.x},y:${vector.y} start vector`)
    startCalculate()
    document.onclick = undefined
  }
}