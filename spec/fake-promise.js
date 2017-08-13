import FPromise from '../fake-promise.js';
import chai from 'chai';

let expect = chai.expect;

describe('简单的同步Promise功能性测试', function() {
  it('一个同步的fulfill Promise操作', function() {
    new FPromise(function(resolve, reject) {
      resolve(123);
    }).then(function(data) {
      expect(data).to.be.equal(123);
    });
  });

  it('一个同步的reject Promise操作', function() {
    new FPromise(function(resolve, reject) {
      reject(123);
    }).then(function(data) {
    }, function(err) {
      expect(err).to.be.equal(123);
    })
  })
})

describe('简单的异步Promise功能测试', function() {
  it('一个异步的fulfill Promise操作', function() {
    new FPromise(function(resolve, reject) {
      setTimeout(function() {
        resolve(123);
      }, 1000);
    }).then(function(data){
      expect(data).to.be.equal(123);
    });
  });
  it('一个异步的reject Promise操作', function() {
    new FPromise(function(resolve, reject) {
      setTimeout(function() {
        reject(123);
      }, 1000);
    }).then(function(data){
      expect(data).to.be.undefined;
    }, function(err) {
      expect(err).to.be.equal(123);
    });    
  });
  it('一个异步的链式调用', function() {
    new FPromise(function(resolve, reject) {
      setTimeout(function() {
        resolve(123);
      }, 1000);
    }).then(function(data){
      return new FPromise(function(resolve, reject) {
        setTimeout(function() {
          resolve(data + 456);
        });
      });
    }, function(err) {
      expect(err).to.be.equal(123);
    }).then(function(data) {
      expect(data).to.be.equal(579);
    });
  });
});

describe('方法测试', function() {
  var pTime = function(time) {
    return new FPromise(function(resolve, reject) {
      setTimeout(function() {
        resolve(time);
      }, time);
    });
  };
  var p500 = pTime(500);
  var p1000 = pTime(1000);
  var p1500 = pTime(1500);
  it('Promise.all', function() {
    FPromise.all([
      p500,
      p1000,
      p1500
    ]).then(function(data) {
      expect(data).to.be([500, 1000, 1500]);
    })
  });
  it('Promise.race', function() {
    FPromise.race([
      p500,
      p1000,
      p1500
    ]).then(function(data) {
      expect(data).to.be.equal(500);
    })
  })
})