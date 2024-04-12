const  Funcionario  = require('../models/Funcionario');
const bycript=require("bcrypt")
module.exports = {
  async store(req, res) {
    
    try {
      const { nome, email, senha, cargo, data_expiracao_contrato, descricao_funcao, desempenho } = req.body;
      const senhaFraca=senha.length;

      console.log(senhaFraca)
      if(senhaFraca<7){
        return res.status(400).json({error:true,message:"Senha muito fraca"})
      }
      const senha_incripada=await bycript.hash(senha,12)

      const funcionario = await Funcionario.create({ nome, email, senha:senha_incripada, cargo, data_expiracao_contrato, descricao_funcao, desempenho });
      
      return res.status(201).json({error:false,message:"Funcionario criado com sucesso",funcionario})
    } catch (error) {
      return res.status(503).json({error:true,message:"Erro ao registrar o Funcionario",messageError:error})
    }
    
    
  },
  async get_funcionario(req,res){

    try {
      const funcionarios= await Funcionario.find().select("-senha")

      return res.status(200).json({error:false,message:"Lista de todos funcionarios",funcionarios})
    } catch (error) {
      return res.status(200).json({error:true,message:"Erro ao listar funcionarios",messageError:error})
    }
  }
  ,
  async get_Ony_funcionario(req,res){
    
    try {
      const {id}=req.params
      if(!id){
        return res.status(403).json({error:false,message:"ID nao fornecido"})
      }
      const funcionario= await Funcionario.findById(id).select("-senha")

      return res.status(200).json({error:false,message:"Lista de todos funcionarios",funcionario})
    } catch (error) {
      return res.status(503).json({error:true,message:"Erro ao listar funcionarios",messageError:error})
    }
  }
  ,
  async uploadFoto(req, res) {
    try {
      const { funcionarioId } = req.params;
      const { filename } = req.file;

      const funcionario = await Funcionario.findByIdAndUpdate(funcionarioId, { foto_perfil: filename }, { new: true });

      if (!funcionario) {
        return res.status(404).send({ error: 'Funcionário não encontrado' });
      }

      return res.json(funcionario);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async verInformacoes(req, res) {
    try {
      const { funcionarioId } = req.params;
      const funcionario = await Funcionario.findById(funcionarioId);

      if (!funcionario) {
        return res.status(404).send({ error: 'Funcionário não encontrado' });
      }

      return res.json(funcionario);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async atualizarDesempenho(req, res) {
    try {
      const { funcionarioId } = req.params;
      const { desempenho } = req.body;

      const funcionario = await Funcionario.findByIdAndUpdate(funcionarioId, { desempenho }, { new: true });

      if (!funcionario) {
        return res.status(404).send({ error: 'Funcionário não encontrado' });
      }

      return res.json(funcionario);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async  verificarDominioNoEmail (req,res,next){

    try {
      const {email}=req.body
     if(!email.includes("@petrohost.ao")){
      return res.status(503).json({error:true,message:"Email com dominio invalido"})
     }
     const emailExist=await Funcionario.findOne({email:email})
     if(emailExist)   return res.status(503).json({error:true,message:"Email ja existe ,por favor usar um outro email"})
     next()
    } catch (error) {
      return res.status(503).json({error:true,message:"Email com dominio invalido"})
    }

  }
};