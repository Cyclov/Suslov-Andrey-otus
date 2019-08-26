const Custumers = require('./data/custumers.json');
const Goods = require('./data/goods.json');
const Carts = require('./data/carts.json');
const _ = require('lodash');
const fs = require('fs');
let {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLInt
} = require('graphql');

const productType = new GraphQLObjectType({
    name: "product",
    description: "",
    fields: () => ({
      id: {type: new GraphQLNonNull(GraphQLInt)},
      name: {type: GraphQLString},
      cost: {type: GraphQLInt}
    })
  });

  const CustumerType = new GraphQLObjectType({
    name: "custumer",
    description: "",
    fields: () => ({
      id: {type: new GraphQLNonNull(GraphQLInt)},
      name: {type: GraphQLString},
      discount: {type: GraphQLInt}
    })
  });

  const cartType = new GraphQLObjectType({
    name: "cart",
    description: "",
    fields: () => ({
      id: {type: new GraphQLNonNull(GraphQLInt)},
      custumerId: {type: new GraphQLNonNull(GraphQLInt)},
      CartProducts: { type: new GraphQLList(cartRowType)  }
    })
  });

  const cartRowType = new GraphQLObjectType({
    name: "cartRow",
    description: "",
    fields: () => ({
      productId: {type: new GraphQLNonNull(GraphQLInt)},
      count: {type: new GraphQLNonNull(GraphQLInt)}
 
    })
  });

  const QueryRootType = new GraphQLObjectType({
    name: 'EShopQuerry',
     
    fields: () => ({

        custumers: {
        type: new GraphQLList(CustumerType),
        description: "List of all custumers",
        resolve: function() {
          return Custumers.custumers;
        }
      },
     
            
        custumer: {
        type: CustumerType,
        description: "CustumerType",
        args:{id: {type: GraphQLInt}} ,
        resolve: (__,args)=>{
            const i = _.findIndex(Custumers.Custumers, o => o.id === args.id)
            if (i === - 1) {
                throw new Error("custumer not found");
            }
            const product =Custumers.custumers[i];
            
            return product;
        }
      },
     
      getCustumerCart:{
        type: cartType,
        description:"Get custumer cart",
        args:{custumerId:{type: GraphQLInt} },
      resolve: (__,args)=>{
        const i = _.findIndex(Carts.carts, o => o.custumerId === args.custumerId)
        if (i === - 1) {
            throw new Error("Custumer's cart not found");
        }
        const cart =Carts.carts[i];
        
        return cart;
    }
 
      },
      products: {
        type: new GraphQLList(productType),
        description: "List of all goods",
        resolve: function() {
          return Goods.goods;
        }
      },
     
            
        product: {
        type: productType,
        description: "product",
        args:{id: {type: GraphQLInt}} ,
        resolve: (err,args)=>{
            const i = _.findIndex(Goods.goods, o => o.id === args.id)
            if (i === - 1) {
                throw new Error("Product not found");
            }
            const product =Goods.goods[i];
            
            return product;
        }
      }



    }
    )
  });


  const MutationRootType = new GraphQLObjectType({
    name: 'eShopMutation',
    fields: () => ({ 
        changeCost:{
           type: productType,
            description:'Change product cost',
            args: {
                productId: { type: GraphQLInt },
                newCost:{type: GraphQLInt }
            },
            resolve: (__,args) =>{ 
                const i = _.findIndex(Goods.goods, o => o.id === args.productId)
                if (i === - 1) {
                    throw new Error("Product not found");
                }
                const product =Goods.goods[i];
                product.cost = args.newCost;
                fs.writeFileSync('./data/goods.json', JSON.stringify(Goods));
                return product;
                
            }
        },
        changeDiscount:{
          type: CustumerType,
           description:'Change custumer discount',
           args: {
               custumerustumerId: { type: GraphQLInt },
               newDiscount:{ type: GraphQLInt }
           },
           resolve: (__,args) =>{ 
               const i = _.findIndex(Custumers.custumers, o => o.id === args.custumerustumerId)
               if (i === - 1) {
                   throw new Error("custumer not found");
               }
               const custumer =Custumers.custumers[i];
               product.cost = args.newDiscount;
               fs.writeFileSync('./data/custumers.json', JSON.stringify(Custumers));
               return product;
               
           }
       },

       addProductToCart:{
        type: cartType,
         description:'add product to cart',
         args: {
          custumerId: { type: GraphQLInt },
             productId:{ type: GraphQLInt },
             count:{ type: GraphQLInt}
         },
         resolve: (__,args) =>{ 
           const i = _.findIndex(Carts.carts, o => o.custumerId === args.custumerId)
        if (i === - 1) {
            throw new Error("Custumer's cart not found");
        }
        const cart =Carts.carts[i];
        cart.CartProducts.push({productId:args.productId, count:args.count})
        fs.writeFileSync('./data/carts.json', JSON.stringify(Carts));
               
        return cart; 
             
         }
     },

     deleteProductFromCart:{
      type: cartType,
       description:'delete product from cart',
       args: {
        custumerId: { type: GraphQLInt },
           productId:{ type: GraphQLInt },
           },
       resolve: (__,args) =>{ 
         const i = _.findIndex(Carts.carts, o => o.custumerId === args.custumerId)
      if (i === - 1) {
          throw new Error("Custumer's cart not found");
      }
      const cart =Carts.carts[i];
      let pi =0;
      while (pi!= -1)
      {
        pi = _.findIndex(cart.CartProducts, o => o.productId === args.productId)
       if(pi!=-1){
        cart.CartProducts.splice(pi, 1);
       } 
       }
       
      fs.writeFileSync('./data/carts.json', JSON.stringify(Carts));
             
      return cart; 
           
       }
   }
       
    })
});
  

  const shopAppSchema = new GraphQLSchema({
    query: QueryRootType,
    mutation:MutationRootType
  });

  module.exports  = shopAppSchema;