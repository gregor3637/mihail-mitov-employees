EmpID,ProjectID,DateFrom,DateTo
10,10,2012-05-16,2014-01-05
10,12,2013-11-01,2014-01-05
20,10,2012-05-16,2014-01-10
20,12,2013-11-01,2015-02-05
20,99,2012-05-16,2019-01-10
20,40,2009-01-01,2011-06-27
30,40,2010-01-01,2010-01-01
40,99,2010-01-01,2019-01-10


// >emp 10 < and >emp 20< worked on >project 10< || duration 2012-05-16,2014-01-05 >> 599 days (calculated by program)
// >emp 10 < and >emp 20< worked on >project 12< || duration 2013-11-01,2014-01-05


// >emp 20 < and >emp 30< worked on >project 40< || duration 2010-01-01,2010-01-02 >> for 1 day
// >emp 20 < and >emp 40< worked on >project 99< || duration 2012-05-16,2019-01-02 >> longest collaboration