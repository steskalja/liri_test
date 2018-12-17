const liri = require('./liri');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var expect = require('chai').expect;
var should = require('chai').should;
var lBot = new liri();


describe('BandSearch', function() {
    it('It should return an object', function() {
        expect(lBot.BandSearch('FooFighters')).to.eventually.be.a('object');
    });
    it('It should have a property venue', function() {
        expect(lBot.BandSearch('FooFighters')).to.eventually.have.property('Venue');
    });
    it('It should have an artist with the name of FooFighters', function() {
        expect(lBot.BandSearch('FooFighters')).to.eventually.have.property('Artist').that.not.eql('FooFighters');
    });
});


describe('MovieSearch', function() {
    it('It should return an object', function() {
        expect(lBot.MovieSearch('Blackbird')).to.eventually.be.a('object');
    });
    it('It should have a property title', function() {
        expect(lBot.MovieSearch('Blackbird')).to.eventually.have.property('Title');
    });
    it('It should return a tile of BlackBird', function() {
        expect(lBot.MovieSearch('Blackbird')).to.eventually.have.property('Title').that.eql('Blackbird');
    });
});

describe('SongSearch', function() {
    it('It should return an object', function() {
        expect(lBot.SongSearch('Blackbird')).to.eventually.be.a('object');
    });
    it('It should have a property Track', function() {
        expect(lBot.SongSearch('Blackbird')).to.eventually.have.property('Track');
    });
    it('It should not have a property Title', function() {
        expect(lBot.SongSearch('Blackbird')).to.not.eventually.have.property('Title');
    });
    it('It should return a track of BlackBird', function() {
        expect(lBot.SongSearch('Blackbird')).to.eventually.have.property('Track').that.not.eql('Blackbird');
    });
});